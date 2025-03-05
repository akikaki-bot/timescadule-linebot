/// <reference types="node" />
import * as fs from "fs";
export declare class LanguageModalUpdator {
    baseUrl: string;
    stream: fs.WriteStream;
    basepath: string;
    constructor(modalpath?: string);
    check(): void;
    internalFileCheck(filename: string): Promise<void>;
    update(file: string): Promise<void>;
    create(file: string): Promise<void>;
    getJson(name: string): Promise<string | false>;
}
