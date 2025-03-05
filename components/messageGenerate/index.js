
const MessageReplyData = require('../dictionary/replyMessage.json')
const { NSCoreParser } = require('../../messageAI/core')
const { NodaGenerator } = require('../../messageAI/generator')


class MessageGenerate {
  constructor( args ) {
      const min = 0 ;
      const max = MessageReplyData.message.length - 1
      
      this.randomNum = Math.floor( Math.random() * (max + 1 - min) ) + min;
      this.args = args
  };

  generate() {
    const levelData = new NSCoreParser(this.args).result
    console.log(levelData)
      return new NodaGenerator(levelData).result.result
  }
}

module.exports = MessageGenerate
