const express = require("express")
const app = express()
const line = require("@line/bot-sdk")
const PORT = process.env.PORT || 8086
const KeyvSqlite = require('@keyv/sqlite')
require('dotenv').config()

// TOKENS
const HSS_ACCESSTOKEN = process.env.HSS_ACCESSTOKEN
const TOKEN = process.env.LINE_ACCESS_KEY
// END TOKENS

// ADDED UTILS
const timeline = require('./components/dictionary/timeline.json')
const ChatGPT = require('./components/messageGenerate/index.js')
const Omikuji = require('./components/japaneseOmikuji/index.js')
const { LanguageModalUpdator } = require('./messageAI/updator')
const PublishMenu = require('./function/publishMenu.js');

// END REGION OF ADDED UTILS

const line_config = {
	channelAccessToken: TOKEN, // 環境変数からアクセストークンをセットしています
	channelSecret: process.env.CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

const bot = new line.Client(line_config);

const db = new KeyvSqlite("sqlite://db/userclass.sqlite")



app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

app.get("/", (req, res) => {
	res.sendStatus(200)
})

app.listen(PORT, async () => {
	new LanguageModalUpdator("./messageAI/library").check()
	console.log(`Something Line App : running in -> http://localhost:${PORT}`)
	await PublishMenu( bot )
})

/**
 * @type {Map<string, boolean>}
 */
const CachedRegisteringClients = new Map()

app.post("/webhook", async (req, res) => {
	res.send("いえい")

	/**
	 * @type {{ 
	 * 		message : import('@line/bot-sdk').Message , 
	 * 		replyToken : string, 
	 * 		source : { 
	 * 			userId : string, 
	 * 			groupId : string, 
	 * 			type : string 
	 * 		} 
	 * 		} 
	 * 	& import('@line/bot-sdk').WebhookEvent
	 */
	const client = req.body.events[0]

	// クラス登録関連の処理

	if(
		client.message.type === "text" &&
		CachedRegisteringClients.has( client.source.userId ) &&
		typeof client.source.groupId === "undefined"
	) {
		const response = client.message.text
		if( isNaN(
			parseInt( response )
		)) {
			await bot.replyMessage( client.replyToken , {
				type : "text",
				text : "半角数字で教えてよ。もっかい！"
			})
			return;
		}
		const responseNumber = parseInt( response )
		if( responseNumber < 1 || responseNumber > 6 ){
			await bot.replyMessage( client.replyToken , {
				type : "text",
				text : `1から6組しかないでしょ？あなたのクラスは${responseNumber}組なの？`
			})
			return;
		}
		// 消す
		CachedRegisteringClients.delete( client.source.userId );
		await db.set( client.source.userId , responseNumber);
		await bot.replyMessage( client.replyToken , {
			type : "text",
			text : `あなたを${responseNumber}組として登録しました。\nこのボットをクラスライン等に招待する場合、あなたが最初に発言することでそのグループが${responseNumber}組として認識されるようになります。`
		})
	}

	if(
		client.message.type === "text" &&
		String( client.message.text ) === ("クラス登録")
	) {
		if(typeof client.source.groupId !== "undefined") {
			await bot.replyMessage( client.replyToken, {
				type : "text",
				text : "グループ上ではクラス登録処理を行うことはできません。このbotの個人チャットでのみ可能です。"
			})
			return;
		}
		CachedRegisteringClients.set( client.source.userId , true)
		await bot.replyMessage( client.replyToken , {
			type : "text",
			text : "あなたのクラスを教えてください。（半角でね☆）"
		})
	}

	if( CachedRegisteringClients.has( client.source.userId ) ) return;

	// クラス登録関係の処理はここまで

	if(
		client.message.type === "text" &&
		String( client.message.text.split(' ')[0] ) === ("グループクラス登録")
	) {
		if( typeof client.source.groupId === "undefined" ){
			await bot.replyMessage(client.replyToken, {
				type: "text",
				text: "この機能はグループチャットでのみ利用できます。"
			})
			return;
		}
		const args = client.message.text.split(" ");
		if( args.length !== 2 ) {
			await bot.replyMessage(client.replyToken, {
				type: "text",
				text: "クラス登録の形式が違います。\n例：\nもしあなたが一組だったら：\n「グループクラス登録 1」"
			})
			return;
		}
		if( isNaN( parseInt( args[1] ) ) ){
			await bot.replyMessage(client.replyToken, {
				type: "text",
				text: "クラス登録の形式が違います。半角数字で引数を登録してね。\n例：\nもしあなたが一組だったら：\n「グループクラス登録 1」"
			})
			return;
		}
		const responseNumber = parseInt( args[1] )
		if( responseNumber < 1 || responseNumber > 6 ){
			await bot.replyMessage( client.replyToken , {
				type : "text",
				text : `1から6組しかないでしょ？あなたのクラスは${responseNumber}組なの？`
			})
			return;
		}
		await db.set( client.source.groupId , responseNumber);
		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: `このグループを${responseNumber}組として登録しました。`
		})
	}

	if (
		client.message.type === "text" &&
		String(client.message.text).match(/今日の教科|今日の時間割/)
	) {
		const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)).getDay();
		const dateConstuctor = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
		const parsedDay = String(dateConstuctor.getMonth() + 1) + String(dateConstuctor.getDate() < 10 ? "0" + dateConstuctor.getDate() : dateConstuctor.getDate())

		const userClass = await db.get( client.source.userId );
		const groupClass = await db.get( client.source.groupId );
		if( typeof client.source.groupId !== "undefined" && typeof userClass !== "undefined" ){
			await db.set( client.source.groupId , userClass );
		}

		const classNumber = typeof userClass === "undefined" ?
								typeof groupClass === "undefined" ?
									undefined :
								groupClass :
							userClass;

		if( typeof classNumber === "undefined" ){
			await bot.replyMessage(client.replyToken, {
				type: "text",
				text: "あなたのクラスが登録されていません。クラス登録をしてください。\n\nクラス登録をする場合は「クラス登録」と発言してくださいね。"
			})
			return;
		}
		const _timelineData = await fetchTimeLine( ChangeIndextoMonthHead( date ) , classNumber );
		const timelineData = _timelineData.filter( data => data !== null );
		console.log( timelineData );

		const Text = `こんにちは！${timeline.timeline[date].message}
2-${classNumber}の今日の時間割です。

・今日の時間割
${(timelineData === null || timelineData.length === 0) ? "授業が登録されていません。休みとかなのかもしれません。\n" : timelineData.map((v, i) => { return `${i + 1} : ${v.name}` }).join('\n')} 
${typeof client.source.groupId === "undefined" ? "" :  "\n※もし違うクラスとして登録されていた場合は、「グループクラス登録 クラス番号」と発言してくださいね。"}

ささいなおしらせ：もうすぐ二年生が終わるので、これを機にこのボットをオープンソース化(OSS)します。詳しくは「オープンソース化」とチャットに送ってみてください。
`

		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: Text
		})

		return;
	}

	if (
		client.message.type === "text" &&
		String(client.message.text).match(/明日の教科|明日の時間割/)
	) {
		const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)).getDay();
		const dateConstuctor = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
		const parsedDay = String(dateConstuctor.getMonth() + 1) + String(dateConstuctor.getDate() < 10 ? "0" + dateConstuctor.getDate() : dateConstuctor.getDate())

		console.log(date, Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000), parsedDay);

		const ThankyouData = tankyu[parsedDay]
		const offsetedDate = date === 6 ? 0 : date + 1;

		const userClass = await db.get( client.source.userId );
		const groupClass = await db.get( client.source.groupId );
		if( typeof client.source.groupId !== "undefined" && typeof userClass !== "undefined" ){
			await db.set( client.source.groupId , userClass );
		}

		const classNumber = typeof userClass === "undefined" ?
								typeof groupClass === "undefined" ?
									undefined :
								groupClass :
							userClass;

		if( typeof classNumber === "undefined" ){
			if( typeof client.source.groupId !== "undefined" ){
				await bot.replyMessage( client.replyToken , {
					type : "text",
					text : "Cannot resolve this group's class. If you set this group class number, you can set on this sentence : グループクラス登録 classNum "
				});
				return;
			}
			await bot.replyMessage(client.replyToken, {
				type: "text",
				text: "あなたのクラスが登録されていません。クラス登録をしてください。\n\nクラス登録をする場合は「クラス登録」と発言してくださいね。"
			})
			return;
		}
		const _timelineData = await fetchTimeLine( ChangeIndextoMonthHead( offsetedDate ) , classNumber );
		const timelineData = _timelineData.filter( data => data !== null )
		const Text = `こんにちは！${timeline.timeline[date].nextday}
2-${classNumber}の明日の時間割です。

・明日の時間割
${(timelineData === null || timelineData.length === 0) ? "授業が登録されていません。休みとかなのかもしれません。\n" : timelineData.map((v, i) => { return `${i + 1} : ${v.name}` }).join('\n')} 

${typeof client.source.groupId === "undefined" ? "" :  "\n※もし違うクラスとして登録されていた場合は、「グループクラス登録 クラス番号」と発言してくださいね。"}
`

		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: Text
		})

		return;
	}

	// 後は別に要らないやつ

	if (
		client.message.type === "text" &&
		String( client.message.text ).match(/オープンソース化/)
	){
		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: "このボットはオープンソースになりました。MIT（一部NSL)にて公開しています。\n詳しくは：https://github.com/akikaki-bot/timescadule-linebot/"
		})
	}
	
	if (
		client.message.type === "text" &&
		String(client.message.text).match(/おみくじ|今日の運勢|運勢|うらない|占い/)
	) {
		const OmikujiObj = new Omikuji().generate()

		const Text = `おみくじ - ${OmikujiObj.luckRank}\n「${OmikujiObj.luckdesc}」\n\n・ラッキーアイテム\n ${OmikujiObj.luckItem.name}\n －${OmikujiObj.luckItem.description}`

		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: Text
		})

		return;
	}

	if(
		client.message.type === "text" &&
		String(client.message.text).match(/バージョン/)
	) {
		await bot.replyMessage(client.replyToken, {
			type: "text",
			text: " High School Scadule API ( https://hss.akikaki.net/ ) - LineBot v2.0.3 Opensource \n 2024/09/05 に変更がされました。\nこのボットはオープンソースです。MITにて公開しています。(https://github.com/akikaki-bot/timescadule-linebot)"
		})
	}

	if (
		client.message.type === "text" &&
		String(client.message.text).match(/お祝いして|おいわいして|いわって|いわえ|happybirthday|birthday|happy/)
	) {
		await bot.replyMessage(client.replyToken, {
			"type": "audio",
			"originalContentUrl": "https://cdn.akikaki.net/happyBirthday.m4a",
			"duration": 2000
		})
		return;
	}


	//new log(`[${usernames[client.source.userId] ? usernames[client.source.userId] : client.source.userId}]\n${client.message.type === "text" ? client.message.text : client.message.type} \nI: IsGroup? ${client.source.groupId ? "YES" : "NO"} / ${client.message.type === "image" ? "IMGID : "+client.message.id : "NOTIMAGE"}`)
})

/**
 * 
 * @param {number} index 
 */
function ChangeIndextoMonthHead( index ){
	switch( index ){
		case 0: return "sun"
		case 1: return "mon"
		case 2: return "tue"
		case 3: return "wed"
		case 4: return "thu"
		case 5: return "fri"
		case 6: return "sat"
		default: return "sun"
	}
}

async function fetchTimeLine( MonthHead , classNumber ){
	const response = await fetch(`https://hss-ds.akikaki.net/v1/school/6425772956013560832/userdatas/2/${classNumber}`,
		{ 
			method: "GET", 
			headers: { 
				"Content-Type": "application/json", 
				Authorization : `Bearer ${HSS_ACCESSTOKEN}` 
			} 
		}
	)
	if(!response.ok) return null;
	const json = await response.json()
	const classData = json.body
	if( typeof classData !== "object") return null;
	const timelineData = classData.timelineData[ MonthHead ];
	return timelineData
}