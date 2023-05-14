import { JSON } from "json-as/assembly";
import { getCallData, storageStore, storageLoad, finish, revert, log } from "./wasmx"
import { Calldata, Log, SetParams, GetParams, DeepParams, DeepParamsReturn } from './types'

export function wasmx_env_1(): void {}

export function instantiate(): void {}

export function main(): void {
  const calldataBz = getCallData();
  const calldata = JSON.parse<Calldata>(String.UTF8.decode(calldataBz));
  if (calldata.set != null) {
    set(calldata.set as SetParams)
    finish(new ArrayBuffer(0))
  } else if(calldata.get != null) {
    const result = get(calldata.get as GetParams)
    finish(result)
  } else {
    revert(String.UTF8.encode("method not found"))
  }
}

// @ts-ignore
@wasmx_schema_execute
export function set(args: SetParams): void {
  const keyEncoded = String.UTF8.encode(args.key);
  const valueEncoded = String.UTF8.encode(args.value);
  storageStore(keyEncoded, valueEncoded);

  const index1 = ab2arr<u8>(keyEncoded.slice(0, 32))
  const ourLog = new Log()
  ourLog.topics = new Array<u8[]>(0);
  ourLog.topics.push(index1);
  ourLog.data = new Array<u8>(0);
  log(String.UTF8.encode(JSON.stringify<Log>(ourLog)));
}

// @ts-ignore
@wasmx_schema_query("view")
export function get(args: GetParams): ArrayBuffer {
  const keyEncoded = String.UTF8.encode(args.key);
  const value = storageLoad(keyEncoded);
  return value;
}

// @ts-ignore
@wasmx_schema_execute("payable")
export function set2(args: DeepParams): DeepParamsReturn {
  const result = new DeepParamsReturn();
  result.value = "value";
  return result;
}

function ab2arr<T>(ab: ArrayBuffer): Array<T> {
  let res = new Array<T>(ab.byteLength >> alignof<T>());
  memory.copy(res.dataStart, changetype<usize>(ab), ab.byteLength);
  return res;
}
