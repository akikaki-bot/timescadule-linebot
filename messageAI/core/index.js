"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSCoreParser = void 0;
var TinySegmenter_1 = require("../library/TinySegmenter");
var AI = require("../library/level.json");
var NSCoreParser = /** @class */ (function () {
    function NSCoreParser(input) {
        this.angry = 0;
        this.sadness = 0;
        this.menhera = 0;
        this.kowai = 0;
        this.nodasou = 0;
        this.kaiwaNext = 0;
        this.angryBai = 0;
        this.odoroki = 0;
        this.core(this.textParse(input));
        console.log("Input : ".concat(this.textParse(input)));
    }
    Object.defineProperty(NSCoreParser.prototype, "result", {
        get: function () {
            return {
                love: this.menhera + this.menhera * (this.kaiwaNext - 0.09),
                angry: this.angry + this.angry * this.angryBai,
                sad: this.sadness + (this.sadness * this.odoroki * 150 - 0.01),
                kowai: this.kowai + this.kowai * this.angryBai,
                so: this.nodasou,
                shock: this.odoroki,
                next: this.kaiwaNext,
                angrybai: this.angryBai
            };
        },
        enumerable: false,
        configurable: true
    });
    NSCoreParser.prototype.core = function (segmented) {
        var _this = this;
        AI.data[AI.index.indexOf("love")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.menhera += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("angry")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if) && (typeof ptn.nextIf !== "undefined" ? segmented.includes(ptn.nextIf) : true)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.angry += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("menhera")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if) && (typeof ptn.nextIf !== "undefined" ? segmented.includes(ptn.nextIf) : true)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.kowai += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("sadness")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if) && (typeof ptn.nextIf !== "undefined" ? segmented.includes(ptn.nextIf) : true)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.sadness += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("angrybai")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.angryBai += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("segment")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if) && (typeof ptn.nextIf !== "undefined" ? segmented.includes(ptn.nextIf) : true)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.kaiwaNext += ptn.point;
                }
            }
        });
        AI.data[AI.index.indexOf("shock")].patterns.map(function (ptn) {
            if (segmented.includes(ptn.if) && (typeof ptn.nextIf !== "undefined" ? segmented.includes(ptn.nextIf) : true)) {
                var index = segmented.indexOf(ptn.if);
                var text = segmented[index] + segmented[index + 1] + segmented[index + 2];
                console.log(segmented, index, text, new RegExp(ptn.match));
                if (text.match(new RegExp(ptn.match))) {
                    console.log("match ".concat(text));
                    _this.odoroki += ptn.point;
                }
            }
        });
    };
    NSCoreParser.prototype.textParse = function (txt) {
        return (0, TinySegmenter_1.segment)(txt);
    };
    return NSCoreParser;
}());
exports.NSCoreParser = NSCoreParser;
