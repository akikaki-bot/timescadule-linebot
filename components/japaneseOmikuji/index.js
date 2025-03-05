
const MessageReplyData = require('../dictionary/unsei.json')

class Omikuji {

    constructor() {
         const min = 0 ;
         const max = MessageReplyData.datas.length - 1

         this.randomNum = Math.floor( Math.random() * (max + 1 - min) ) + min;
    }

    generate() {
        if(this.randomNum === (MessageReplyData.datas.length - 1)){
            const min = 0 ;
            const max = 50
            const Sum = Math.floor( Math.random() * (max + 1 - min) ) + min;
            if(Sum < 45) {
                const minx = 0 ;
                const maxx = MessageReplyData.datas.length - 2
                const ReChusen = Math.floor( Math.random() * (maxx + 1 - minx) ) + minx;

                const Message = MessageReplyData.datas[ReChusen]
                const LuckItem = Message.luckItem[this.generateFromArray(Message.luckItem)]
                const LuckDescription = Message.luckDescription[this.generateFromArray(Message.luckDescription)]
        
                return {
                    "luckRank" : Message.rank,
                    "luckItem" : LuckItem,
                    "luckdesc" : LuckDescription
                }
            } 
        }
      
        const Message = MessageReplyData.datas[this.randomNum]
        const LuckItem = Message.luckItem[this.generateFromArray(Message.luckItem)]
        const LuckDescription = Message.luckDescription[this.generateFromArray(Message.luckDescription)]

        return {
            "luckRank" : Message.rank,
            "luckItem" : LuckItem,
            "luckdesc" : LuckDescription
        }
    }

    generateFromArray( arr ) {
         const min = 0 ;
         const max = arr.length - 1

         return Math.floor( Math.random() * (max + 1 - min) ) + min;
    }
}

module.exports = Omikuji
