export declare class NSCoreParser {
    private angry;
    private sadness;
    private menhera;
    private kowai;
    private nodasou;
    private kaiwaNext;
    private angryBai;
    private odoroki;
    constructor(input: string);
    get result(): {
        love: number;
        angry: number;
        sad: number;
        kowai: number;
        so: number;
        shock: number;
        next: number;
        angrybai: number;
    };
    core(segmented: string[]): void;
    textParse(txt: string): Array<string>;
}
