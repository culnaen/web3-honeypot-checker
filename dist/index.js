"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckERC20Safety = void 0;
var web3_1 = __importDefault(require("web3"));
var chainDatas_1 = require("./chainDatas");
var CheckERC20Safety = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var binance, provider, web3, bnbIN, encodedAddress, contractFuncData, callData, result, decoded, buyExpectedOut, buyActualOut, sellExpectedOut, sellActualOut, buyGasUsed, sellGasUsed, buy_tax, sell_tax, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                binance = chainDatas_1.ethereumChains.find(function (e) { return e.id === "binance"; });
                if (!binance) return [3, 5];
                provider = new web3_1.default.providers.HttpProvider(binance.rcpAddress);
                web3 = new web3_1.default(provider);
                bnbIN = web3.utils.toWei("0.5", "ether");
                encodedAddress = web3.eth.abi.encodeParameter("address", address);
                contractFuncData = "0xd66383cb";
                callData = contractFuncData + encodedAddress.substring(2);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, web3.eth.call({
                        to: "0x2bf75fd2fab5fc635a4c6073864c708dfc8396fc",
                        from: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
                        value: bnbIN,
                        gas: 45000000,
                        data: callData,
                    })];
            case 2:
                result = _a.sent();
                if (result) {
                    decoded = web3.eth.abi.decodeParameters(["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"], result);
                    buyExpectedOut = web3.utils.toBN(decoded[0]);
                    buyActualOut = web3.utils.toBN(decoded[1]);
                    sellExpectedOut = web3.utils.toBN(decoded[2]);
                    sellActualOut = web3.utils.toBN(decoded[3]);
                    buyGasUsed = web3.utils.toBN(decoded[4]).toNumber();
                    sellGasUsed = web3.utils.toBN(decoded[5]).toNumber();
                    buy_tax = Math.round(((buyExpectedOut - buyActualOut) / buyExpectedOut) * 100 * 10) / 10;
                    sell_tax = Math.round(((sellExpectedOut - sellActualOut) / sellExpectedOut) * 100 * 10) / 10;
                    if (buy_tax + sell_tax > 50) {
                        return [2, { isHoneypot: true, buyTax: buy_tax, sellTax: sell_tax }];
                    }
                    if (buyGasUsed + sellGasUsed >= 45000000 * 0.8) {
                        return [2, { isHoneypot: true, buyTax: buy_tax, sellTax: sell_tax }];
                    }
                    return [2, { isHoneypot: false, buyTax: buy_tax, sellTax: sell_tax }];
                }
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                message = error_1.message;
                if (message) {
                    console.log(message);
                    if (message.includes("TRANSFER_FROM_FAILED")) {
                        return [2, { isHoneypot: true, buyTax: "0", sellTax: "0" }];
                    }
                }
                return [3, 4];
            case 4: return [3, 6];
            case 5: return [2, { isHoneypot: false, buyTax: "0", sellTax: "0" }];
            case 6: return [2];
        }
    });
}); };
exports.CheckERC20Safety = CheckERC20Safety;
//# sourceMappingURL=index.js.map