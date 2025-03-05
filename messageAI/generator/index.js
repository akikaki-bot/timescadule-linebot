"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodaGenerator = void 0;
var ReplyData = require("../library/replay.json");
var NodaGenerator = /** @class */ (function () {
    function NodaGenerator(data) {
        this.text = "なし";
        this.parse(data);
    }
    Object.defineProperty(NodaGenerator.prototype, "result", {
        get: function () {
            return {
                result: this.text
            };
        },
        enumerable: false,
        configurable: true
    });
    NodaGenerator.prototype.parse = function (data) {
        var love = data.love, angry = data.angry, sad = data.sad, kowai = data.kowai, so = data.so, shock = data.shock, next = data.next, angrybai = data.angrybai;
        var TopValue = Math.max(love, angry, sad, kowai, so, shock);
        var topKanjo = this.findTopKey(TopValue, data);
        var replyData = ReplyData.data[ReplyData.index.indexOf(topKanjo)];
        var n = replyData.minList.find(function (v) { return v > TopValue; });
        var IndexReply = typeof n === "undefined" ? replyData.minList.length - 1 : replyData.minList.indexOf(n);
        console.log(IndexReply);
        var ReplyArray = replyData.reply[IndexReply].data;
        this.text = this.generateRandomMessage(ReplyArray);
    };
    NodaGenerator.prototype.findTopKey = function (TopValue, data) {
        var love = data.love, angry = data.angry, sad = data.sad, kowai = data.kowai, so = data.so, shock = data.shock, next = data.next, angrybai = data.angrybai;
        var result = love === TopValue ? "love" :
            angry === TopValue ? "angry" :
                sad === TopValue ? "sad" :
                    kowai === TopValue ? "kowai" :
                        so === TopValue ? "so" :
                            shock === TopValue ? "shock" : "normal";
        return result;
    };
    NodaGenerator.prototype.generateRandomMessage = function (data) {
        var min = 0;
        var max = data.length - 1;
        return data[Math.floor(Math.random() * (max + 1 - min)) + min];
    };
    ;
    return NodaGenerator;
}());
exports.NodaGenerator = NodaGenerator;
