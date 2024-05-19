interface POJO {
    [key: string]: string | number | bigint | Date;
}
export declare const sort: (o: unknown, ...keys: Array<string>) => Array<POJO>;
export {};
