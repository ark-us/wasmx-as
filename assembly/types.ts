import { JSON } from "json-as/assembly";
import {Uint256} from './common_types';

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
  value!: Uint256;
}

// @ts-ignore
@serializable
export class GetParams {
  key!: string;
}

// @ts-ignore
@serializable
export class DeepParams {
  params!: SetParams;
}

// @ts-ignore
@serializable
export class DeepParamsReturn {
  value!: string;
}
