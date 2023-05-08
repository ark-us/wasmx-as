import { JSON } from "json-as/assembly";
import { storageStore, storageLoad, getCallData, finish, revert, log } from "./wasmx"

@serializable
class SetParams {
  key!: string;
  value!: string;
}

@serializable
class GetParams {
  key!: string;
}

@serializable
class Calldata {
  method!: string;
  params!: string;
}

@serializable
class Log {
	data!:   u8[]
	topics!: Array<u8[]>
}

export function wasmx_env_1(): void {}

export function instantiate(): void {}

export function main(): void {
  const calldata = getCallData();
  const calldataJson = JSON.parse<Calldata>(String.UTF8.decode(calldata));

  if (calldataJson.method == "set") {
    const args = JSON.parse<SetParams>(calldataJson.params);
    set(args)
    finish(new ArrayBuffer(0))
  } else if(calldataJson.method == "get") {
    const args = JSON.parse<GetParams>(calldataJson.params);
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
