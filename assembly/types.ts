import { JSON } from "json-as/assembly";

// @ts-ignore
@serializable
export class Calldata {
  method!: string;
  params!: string;
}

// @ts-ignore
@serializable
export class Log {
	data!: u8[]
	topics!: Array<u8[]>
}
