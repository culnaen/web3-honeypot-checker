export declare const CheckERC20Safety: (address: string) => Promise<{
    isHoneypot: boolean;
    buyTax: number;
    sellTax: number;
} | {
    isHoneypot: boolean;
    buyTax: string;
    sellTax: string;
} | undefined>;
