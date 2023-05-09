import { JSON } from "json-as/assembly";
import { storageStore, storageLoad, getCallData, finish, revert, log } from "./wasmx"
import { Calldata, Log } from './types'

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

export function init(calldata: Calldata): void {
  if (calldata.method == "set") {
    const args = JSON.parse<SetParams>(calldata.params);
    set(args)
    finish(new ArrayBuffer(0))
  } else if(calldata.method == "get") {
    const args = JSON.parse<GetParams>(calldata.params);
    const result = get(args)
    finish(result)
  } else {
    revert(String.UTF8.encode("method not found"))
  }
}

function set(args: SetParams): void {
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

function get(args: GetParams): ArrayBuffer {
  const keyEncoded = String.UTF8.encode(args.key);
  const value = storageLoad(keyEncoded);
  return value;
}

function ab2arr<T>(ab: ArrayBuffer): Array<T> {
  let res = new Array<T>(ab.byteLength >> alignof<T>());
  memory.copy(res.dataStart, changetype<usize>(ab), ab.byteLength);
  return res;
}
