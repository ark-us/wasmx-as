import { JSON } from "json-as/assembly";

// @ts-ignore
@serializable
export class Calldata {
  set!: SetParams | null;
  get!: GetParams | null;
}

// @ts-ignore
@serializable
export class Log {
	data!: u8[]
	topics!: Array<u8[]>
}


// @ts-ignore
@serializable
export class SetParams {
  key!: string;
  value!: string;
}

// @ts-ignore
@serializable
export class GetParams {
  key!: string;
}
