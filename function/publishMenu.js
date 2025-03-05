
const { readFileSync } = require('fs')


async function PublishMenu( lineBotSDKClient ){
    let richMenu = await lineBotSDKClient.createRichMenu({
        "name" : "時間割メニュー",
        "chatBarText" : "簡単操作メニュー",
        "size" : {
            "width" : 2500,
            "height" : 843
        },
        "selected" : true,
        "areas" : [
            {
                "bounds" : {
                    "x" : 0,
                    "y" : 0,
                    "width" : 833,
                    "height" : 843
                },
                "action" : {
                    "type" : "message",
		    "label" : "タップ領域A",
                    "text" : "今日の時間割",
                }
            },
            {
                "bounds" : {
                    "x" : 834,
                    "y" : 0,
                    "width" : 834,
                    "height" : 843
                },
                "action" : {
                    "type" : "message",
		    "label" : "タップ領域B",
                    "text" : "明日の時間割",
                }
            },
            {
                "bounds" : {
                    "x" : 1669,
                    "y" : 0,
                    "width" : 832,
                    "height" : 843
                },
                "action" : {
                    "type" : "message",
		    "label" : "タップ領域C",
                    "text" : "クラス登録",
                }
            }
        ]
    })

    const image = readFileSync('./images/contextMenu.png');
    await lineBotSDKClient.setRichMenuImage( richMenu , image );
    await lineBotSDKClient.setDefaultRichMenu( richMenu );
}

module.exports = PublishMenu;
