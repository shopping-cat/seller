import { gql, MutationHookOptions, QueryHookOptions, useApolloClient } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/ITEM
export const ITEM = gql`
  query ($id:Int!){
    item(id:$id) {
        id
        name
    }
  }
`
export interface ItemDetail {
    id: number
    name: string
}
interface ItemData {
    item: ItemDetail
}
interface ItemVars {
    id: number
}
export const useItem = (options?: QueryHookOptions<ItemData, ItemVars>) => createQueryHook<ItemData, ItemVars>(ITEM, {
    ...options,
})