import { storageStore, storageStore2, storageStore3, storageLoad, getCallData, finish } from "./wasmx"
// import { Uint8Array } from "assemblyscript/std/uint8array";


export function wasmx_env_1(): void {}

export function instantiate(): void {}

export function main(): void {
  // const calld = getCallData()
  const key = "hello"
  const value = "sammy"
  // storageStore("0", calld)
  storageStore(key, value)

  const keyEncoded = String.UTF8.encode(key);
  const valueEncoded = String.UTF8.encode(value);
  storageStore2(changetype<i32>(keyEncoded), keyEncoded.byteLength, changetype<i32>(valueEncoded), valueEncoded.byteLength)

  storageStore3(keyEncoded, valueEncoded)

  const newvalue = storageLoad(keyEncoded)
  finish(newvalue)
}

export function add(a: i32, b: i32): i32 {
  return a + b;
}



// // Declare the start address of the string in memory
// const address: i32 = /* memory address */;

// // Declare the length of the string in bytes
// const length: i32 = /* length of the string in bytes */;

// // Read the bytes from memory into a Uint8Array
// const bytes = Uint8Array.wrap(memory.buffer, address, length);

// // Convert the Uint8Array to an AssemblyScript string
// const str = String.fromUTF8Array(bytes);
