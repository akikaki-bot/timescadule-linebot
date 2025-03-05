"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModalUpdator = void 0;
var fs = require("fs");
var LanguageModalUpdator = /** @class */ (function () {
    function LanguageModalUpdator(modalpath) {
        this.baseUrl = "https://raw.githubusercontent.com/akikaki-bot/language_modal/main/";
        this.basepath = modalpath !== null && modalpath !== void 0 ? modalpath : "./library";
    }
    LanguageModalUpdator.prototype.check = function () {
        console.log("[NSLanguageUpdator] Version 0.0.1 @ release ");
        console.log("[NSLanguageUpdator] \uD83D\uDD0D\u001B[36m\u30A2\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u30C7\u30FC\u30BF\u30FC\u306F\u73FE\u5728\u66F4\u65B0\u3092\u78BA\u8A8D\u3057\u3066\u3044\u307E\u3059\u3002\u001B[0m");
        this.internalFileCheck("level");
        this.internalFileCheck("replay");
    };
    LanguageModalUpdator.prototype.internalFileCheck = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            var ModalJsonFile, version, ghFile, ghVersion, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 7]);
                        ModalJsonFile = fs.readFileSync("".concat(this.basepath, "/").concat(filename, ".json"), "utf-8");
                        if (typeof ModalJsonFile === "undefined")
                            return [2 /*return*/, this.create(filename)];
                        version = JSON.parse(ModalJsonFile)["@version"];
                        if (!(typeof version === "string")) return [3 /*break*/, 4];
                        console.log("[NSLanguageUpdator] \u001B[36m[i]\u001B[0m ".concat(filename, ".json@").concat(version));
                        return [4 /*yield*/, this.getJson("".concat(filename, ".json"))];
                    case 1:
                        ghFile = _a.sent();
                        if (ghFile === false)
                            throw new NSLanguageModalUpdatorError("found rename the assets. Check gh.");
                        ghVersion = JSON.parse(ghFile)["@version"];
                        if (typeof ghVersion !== "string")
                            throw new NSLanguageModalUpdatorError("Update check failed because failed json check from gh server.");
                        if (!(ghVersion === version)) return [3 /*break*/, 2];
                        return [2 /*return*/, console.log("[NSLanguageUpdator] \u001B[32m\u2714\u001B[37m \u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u306F\u5FC5\u8981\u3042\u308A\u307E\u305B\u3093\u3002")];
                    case 2: return [4 /*yield*/, this.update(filename)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        console.log("[NSLanguageUpdator] \u001B[31m \u30A2\u30BB\u30C3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u001B[0m\u65B0\u3057\u3044\u30A2\u30BB\u30C3\u30C8\u3092\u4F5C\u6210\u3057\u3066\u3044\u307E\u3059\u3002");
                        return [4 /*yield*/, this.create(filename)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LanguageModalUpdator.prototype.update = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var JsonText, stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[NSLanguageUpdator] \u001B[33m[!!]\u001B[37m \u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F\u3002\u66F4\u65B0\u3057\u3066\u3044\u307E\u3059\u3002 ");
                        return [4 /*yield*/, this.getJson("".concat(file, ".json"))];
                    case 1:
                        JsonText = _a.sent();
                        stream = fs.createWriteStream("".concat(this.basepath, "/").concat(file, ".json"));
                        stream.write(JsonText, "utf-8");
                        stream.end();
                        stream.on('finish', function () {
                            console.log("[NSLanguageUpdator] \u001B[32m\u2714\u001B[37m \u30A2\u30BB\u30C3\u30C8".concat(file, "\u306E\u66F4\u65B0\u304C\u6B63\u5E38\u306B\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002"));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LanguageModalUpdator.prototype.create = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var JsonText, stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[NSLanguageUpdator] \u001B[33m \u898B\u3064\u304B\u3089\u306A\u3044\u30A2\u30BB\u30C3\u30C8\u3092\u65B0\u898F\u4F5C\u6210\u3057\u3066\u3044\u307E\u3059\u3002 \u001B[37m");
                        return [4 /*yield*/, this.getJson("".concat(file, ".json"))];
                    case 1:
                        JsonText = _a.sent();
                        if (JsonText === false)
                            return [2 /*return*/, console.log("[NSLanguageUpdator] \u001B[31m\u2718\u001B[37m \u30A2\u30BB\u30C3\u30C8".concat(file, "\u306F\u001B[31m\u7121\u52B9\u001B[37m\u3067\u3059\u3002\u30EA\u30DD\u30B8\u30C8\u30EA\u307E\u305F\u306F\u30D5\u30A1\u30A4\u30EB\u69CB\u6210\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"))];
                        stream = fs.createWriteStream("".concat(this.basepath, "/").concat(file, ".json"));
                        stream.write(JsonText, "utf-8");
                        stream.end();
                        stream.on('finish', function () {
                            console.log("[NSLanguageUpdator] \u001B[32m\u2714\u001B[37m \u30A2\u30BB\u30C3\u30C8".concat(file, "\u306E\u4F5C\u6210\u304C\u6B63\u5E38\u306B\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002"));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LanguageModalUpdator.prototype.getJson = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.baseUrl + name)];
                    case 1:
                        response = _a.sent();
                        if (response.status === 404)
                            return [2 /*return*/, false];
                        if (!response.ok)
                            throw new NSLanguageModalUpdatorError("Fetch failed from gh.");
                        return [4 /*yield*/, response.text()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LanguageModalUpdator;
}());
exports.LanguageModalUpdator = LanguageModalUpdator;
var NSLanguageModalUpdatorError = /** @class */ (function (_super) {
    __extends(NSLanguageModalUpdatorError, _super);
    function NSLanguageModalUpdatorError(reason) {
        return _super.call(this, "Update Failed. Reason : ".concat(reason)) || this;
    }
    return NSLanguageModalUpdatorError;
}(Error));
