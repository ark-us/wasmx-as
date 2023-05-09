import { JSON } from "json-as/assembly";
import { getCallData } from "./wasmx"
import { Calldata } from './types'
import { init } from './contract'

export function wasmx_env_1(): void {}

export function instantiate(): void {}

export function main(): void {
  const calldataBz = getCallData();
  const calldata = JSON.parse<Calldata>(String.UTF8.decode(calldataBz));
  init(calldata);
}
