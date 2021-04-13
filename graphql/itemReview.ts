import { gql, QueryHookOptions } from "@apollo/client"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/ITEM_REVIEWS
export const ITEM_REVIEWS = gql`
  query($id:Int!) {
    item(id:$id) {
        id
        rate
    }
    itemReviews(itemId:$id) {
        id
        createdAt
        likeNum
        content
        rate
        images {
            id
            uri
        }
        order {
            id
            totalPrice
            stringOptionNum
        }
        user {
            id
            name
            photo
        }
    }
  }
`
export interface ItemReview {
    id: number
    createdAt: Date
    likeNum: number
    content: string
    rate: number
    images: {
        id: number
        uri: string
    }[]
    order: {
        totalPrice: number
        stringOptionNum: string
    }
    user: {
        name: string
        photo: string
    }
}
interface ItemReviewsData {
    item: {
        id: number
        rate: number
    }
    itemReviews: ItemReview[]
}
interface ItemReviewsVars {
    id: number
}
export const useItemReviews = createQueryHook<ItemReviewsData, ItemReviewsVars>(ITEM_REVIEWS)

export const RECENT_REVIEWS = gql`
  query{
    shop {
        id
        rate
        rateNum
    }
    recentReviews{
        id
        createdAt
        likeNum
        content
        rate
        images {
            id
            uri
        }
        order {
            id
            totalPrice
            stringOptionNum
        }
        user {
            id
            name
            photo
        }
        item {
            id
            name
        }
    }
  }
`
interface RecentReviewsData {
    shop: {
        id: number
        rate: number
        rateNum: number
    }
    recentReviews: ItemReview[]
}
interface RecentReviewsVars { }
export const useRecentReviews = createQueryHook<RecentReviewsData, RecentReviewsVars>(RECENT_REVIEWS)
