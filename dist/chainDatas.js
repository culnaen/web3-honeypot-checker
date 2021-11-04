"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethereumChains = void 0;
exports.ethereumChains = [
    {
        id: "binance",
        name: "Binance Smart Chain (BSC)",
        slug: "BSC",
        logo: "./assets/bsc.png",
        scanLogo: "./assets/bscscan.png",
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
        factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
        rcpAddress: "https://bsc-dataseed1.ninicoin.io/",
        wCoin: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        testContract: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        contractExplorer: function (address) {
            return "https://bscscan.com/token/" + address;
        },
        chartLink: function (address) { return "https://poocoin.app/tokens/" + address; },
        swapLink: function (address) { return "https://poocoin.app/tokens/" + address; },
    },
];
//# sourceMappingURL=chainDatas.js.map