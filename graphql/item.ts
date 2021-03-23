import { gql, MutationHookOptions, QueryHookOptions, useApolloClient } from "@apollo/client";
import { ItemState, ItemRequireInformation, ItemOption } from "../constants/type";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/ITEM
export const ITEM = gql`
  query ($id:Int!){
    item(id:$id) {
        id
        name
        likeNum
        state
        deliveryPrice
        extraDeliveryPrice
        sale
        price
        salePrice
        option
        requireInformation
        html
        category1
        category2
        rate
        totalOrderNum
        reviewNum
        images {
            id
            uri
        }
    }
  }
`
export interface ItemDetail {
    id: number
    name: string
    likeNum: number
    state: ItemState
    deliveryPrice: number
    extraDeliveryPrice: number
    price: number
    sale: number
    salePrice: number
    option: ItemOption
    requireInformation: ItemRequireInformation
    html: string
    category1: string | null
    category2: string | null
    rate: number
    totalOrderNum: number
    reviewNum: number
    images: {
        id: number
        uri: string
    }[]
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

// QUERY/ITEMS
export const ITEMS = gql`
  query {
    items {
        id
        name
        createdAt
        likeNum
        state
        price
        deliveryPrice
        isFreeDelivery
        sale
        rate
        reviewNum
        totalOrderNum
    }
  }
`
export interface Item {
    id: number
    name: string
    createdAt: Date
    likeNum: number
    state: ItemState
    price: number
    deliveryPrice: number
    isFreeDelivery: boolean
    sale: number
    rate: number
    reviewNum: number
    totalOrderNum: number
}
interface ItemsData {
    items: Item[]
}
interface ItemsVars {

}
export const useItems = (options?: QueryHookOptions<ItemsData, ItemsVars>) => createQueryHook<ItemsData, ItemsVars>(ITEMS, {
    ...options,
})

// QUERY/CREATE_ITEM
export const CREATE_ITEM = gql`
  mutation ($input:CreateItemInput!) {
    createItem(createItemInput: $input) {
        id
    }
  }
`

interface ItemsData {
    createItem: {
        id: number
    }
}
interface ItemsVars {
    input: {
        name: string
        category1: string | null
        category2: string | null
        price: number
        deliveryPrice: number
        extraDeliveryPrice: number
        option: ItemOption
        requireInformation: ItemRequireInformation
        images: number[]
        html: string
    }
}
export const useCreateItem = (options?: MutationHookOptions<ItemsData, ItemsVars>) => createMutationHook<ItemsData, ItemsVars>(CREATE_ITEM, {
    ...options,
})