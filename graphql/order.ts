import { gql, QueryHookOptions } from "@apollo/client"
import { createQueryHook } from "../lib/createApolloHook"

// 주문관리 화면
export const ORDER_INFOS = gql`
  query {
    shop {
        id
        newOrderNum
        onDeliveryOrderNum
        completedDeliveryOrderNum
        confirmedOrderNum
        refundRequestOrderNum
        exchangeRequestOrderNum
        refundedOrderNum
        exchangedOrderNum
    }
    newOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    onDeliveryOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    completedDeliveryOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    confirmedOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    refundRequestOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    exchangeRequestOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    refundedOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    exchangedOrders {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
  }
`

export interface OrderInfoOrder {
    id: number
    stringOptionNum: string
    item: {
        id: number
        name: string
    }
}

interface OrderInfosData {
    shop: {
        id: number
        newOrderNum: number
        onDeliveryOrderNum: number
        completedDeliveryOrderNum: number
        confirmedOrderNum: number
        refundRequestOrderNum: number
        exchangeRequestOrderNum: number
        refundedOrderNum: number
        exchangedOrderNum: number
    }
    newOrders: OrderInfoOrder[]
    onDeliveryOrders: OrderInfoOrder[]
    completedDeliveryOrders: OrderInfoOrder[]
    confirmedOrders: OrderInfoOrder[]
    refundRequestOrders: OrderInfoOrder[]
    exchangeRequestOrders: OrderInfoOrder[]
    refundedOrders: OrderInfoOrder[]
    exchangedOrders: OrderInfoOrder[]
}
interface OrderInfosVars {

}
export const useOrderInfos = (options?: QueryHookOptions<OrderInfosData, OrderInfosVars>) => createQueryHook<OrderInfosData, OrderInfosVars>(ORDER_INFOS, {
    ...options,
})
