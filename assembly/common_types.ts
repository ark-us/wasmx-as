import { JSON } from "json-as/assembly";

export type Uint256 = string
export type Uint128 = string
export type Address = string

// @ts-ignore
@serializable
export class Coin {
    denom!: string
    amount!: Uint128
}
