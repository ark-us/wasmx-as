// export declare function callDataCopy(ptr: i32, calldataPtr: i32, calldataLen: i32): void
// export declare function storageStore(keyPtr: i32, keyLen: i32, valuePtr: i32, valueLen: i32): void
// export declare function storageLoad(keyPtr: i32, keyLen: i32, valuePtr: i32): i32
// export declare function finish(valuePtr: i32, valueLen: i32): void
// export declare function revert(valuePtr: i32, valueLen: i32): void

export declare function getCallData(): string
export declare function storageStore(key: string, value: string): void
export declare function storageStore2(keyPtr: i32, keyLen: i32, valuePtr: i32, valueLen: i32): void
export declare function storageStore3(key: ArrayBuffer, value: ArrayBuffer): void
export declare function storageLoad(key: ArrayBuffer): ArrayBuffer
export declare function finish(value: ArrayBuffer): void
export declare function revert(message: ArrayBuffer): void
