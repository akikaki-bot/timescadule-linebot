type NeedConstuctor = {
    love: number;
    angry: number;
    sad: number;
    kowai: number;
    so: number;
    shock: number;
    next: number;
    angrybai: number;
};
export declare class NodaGenerator {
    private text;
    constructor(data: NeedConstuctor);
    get result(): {
        result: string;
    };
    parse(data: NeedConstuctor): void;
    findTopKey(TopValue: number, data: NeedConstuctor): "normal" | "so" | "love" | "angry" | "shock" | "sad" | "kowai";
    generateRandomMessage(data: string[]): string;
}
export {};
