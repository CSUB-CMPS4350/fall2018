export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
export interface JsonArray extends Array<AnyJson> {}