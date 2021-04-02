import { gql } from "@apollo/client";
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
        updateItem {
            id
            name
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
            images {
                id
                uri
            }
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
    updateItem: {
        id: number
        name: string
        deliveryPrice: number
        extraDeliveryPrice: number
        sale: number
        price: number
        salePrice: number
        option: ItemOption
        requireInformation: ItemRequireInformation
        html: string
        category1: string | null
        category2: string | null
        images: {
            id: number
            uri: string
        }[]
    } | null
}
interface ItemData {
    item: ItemDetail
}
interface ItemVars {
    id: number
}
export const useItem = createQueryHook<ItemData, ItemVars>(ITEM)

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
        updateItem {
            id
        }
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
    updateItem: {
        id: number
    } | null
}
interface ItemsData {
    items: Item[]
}
interface ItemsVars {

}
export const useItems = createQueryHook<ItemsData, ItemsVars>(ITEMS)

// QUERY/CREATE_ITEM
export const CREATE_ITEM = gql`
  mutation ($input:CreateItemInput!) {
    createItem(createItemInput: $input) {
        id
    }
  }
`

interface CreateItemData {
    createItem: {
        id: number
    }
}
interface CreateItemVars {
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
export const useCreateItem = createMutationHook<CreateItemData, CreateItemVars>(CREATE_ITEM)


// QUERY/UPDATE_ITEM
export const UPDATE_ITEM = gql`
  mutation ($input:UpdateItemInput!) {
    updateItem(updateItemInput: $input) {
        id
        name
        state
        category1
        category2
        sale
        price
        deliveryPrice
        extraDeliveryPrice
        option
        requireInformation
        images {
            id
            uri
        }
        html
    }
  }
`

interface UpdateItemData {
    updateItem: {
        id: number
    }
}
interface UpdateItemVars {
    input: {
        id: number
        name: string
        category1: string | null
        category2: string | null
        price: number
        sale: number
        deliveryPrice: number
        extraDeliveryPrice: number
        option: ItemOption
        requireInformation: ItemRequireInformation
        images: number[]
        html: string
    }
}
export const useUpdateItem = createMutationHook<UpdateItemData, UpdateItemVars>(UPDATE_ITEM)

// QUERY/UPDATE_ITEM_STATE
export const UPDATE_ITEM_STATE = gql`
  mutation ($id: Int!, $state: String!) {
    updateItemState(id:$id, state:$state) {
        id
        state
    }
  }
`

interface UpdateItemStateData {
    updateItemState: {
        id: number
        state: ItemState
    }
}
interface UpdateItemStateVars {
    id: number
    state: string
}
export const useUpdateItemState = createMutationHook<UpdateItemStateData, UpdateItemStateVars>(UPDATE_ITEM_STATE)

// QUERY/DELETE_ITEM
export const DELETE_ITEM = gql`
  mutation ($id: Int!) {
    deleteItem(id:$id) {
        id
    }
  }
`

interface DeleteItemData {
    deleteItem: {
        id: number
    }
}
interface DeleteItemVars {
    id: number
}
export const useDeleteItem = createMutationHook<DeleteItemData, DeleteItemVars>(DELETE_ITEM)

// QUERY/DELETE_ITEM_UPDATE
export const DELETE_ITEM_UPDATE = gql`
  mutation ($id: Int!) {
    deleteItemUpdate(id:$id) {
        id
    }
  }
`

interface DeleteItemUpdateData {
    deleteItemUpdate: {
        id: number
    }
}
interface DeleteItemUpdateVars {
    id: number
}
export const useDeleteItemUpdate = createMutationHook<DeleteItemUpdateData, DeleteItemUpdateVars>(DELETE_ITEM_UPDATE)