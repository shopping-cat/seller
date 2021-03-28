import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client"
import { OrderState } from "../constants/type"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

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

// 신구주문 리스트
export const NEW_ORDERS = gql`
  query($offset:Int, $limit:Int) {
    newOrders(offset:$offset, limit:$limit) {
        id
        stringOptionNum
        state
        reason
        payment {
            id
            address
            addressName
            addressPhone
            deliveryMemo
            postCode
        }
        item {
            id
            name
            mainImage
        }
        user {
            id
            name
        }
    }
  }
`

export interface NewOrder {
    id: number
    stringOptionNum: string
    state: OrderState
    reason: string | null
    payment: {
        id: number
        address: string
        addressName: string
        addressPhone: string
        deliveryMemo: string
        postCode: string
    }
    item: {
        id: number
        name: string
        mainImage: string
    }
    user: {
        id: string
        name: string
    }
}

interface NewOrdersData {
    newOrders: NewOrder[]
}
interface NewOrdersVars {
    offset?: number
    limit?: number
}
export const useNewOrders = (options?: QueryHookOptions<NewOrdersData, NewOrdersVars>) => createQueryHook<NewOrdersData, NewOrdersVars>(NEW_ORDERS, {
    ...options,
})


export const REGIST_DELIVERY = gql`
  mutation($id:Int!, $deliveryNumber:String!, $deliveryCompany:String!) {
    registDelivery(id:$id, deliveryNumber:$deliveryNumber, deliveryCompany:$deliveryCompany) {
        id
        state
    }
  }
`


interface RegistDeliveryData {
    registDelivery: {
        id: number
        state: OrderState
    }
}
interface RegistDeliveryVars {
    id: number
    deliveryNumber: string
    deliveryCompany: string
}
export const useRegistDelivery = (options?: MutationHookOptions<RegistDeliveryData, RegistDeliveryVars>) => createMutationHook<RegistDeliveryData, RegistDeliveryVars>(REGIST_DELIVERY, {
    ...options,
})


export const CANCEL_ORDER = gql`
  mutation($id:Int!, $reason:String!) {
    cancelOrder(id:$id, reason:$reason) {
        id
        state
        reason
    }
  }
`


interface CancelOrderData {
    cancelOrder: {
        id: number
        state: OrderState
        reason: string
    }
}
interface CancelOrderVars {
    id: number
    reason: string
}
export const useCancelOrder = (options?: MutationHookOptions<CancelOrderData, CancelOrderVars>) => createMutationHook<CancelOrderData, CancelOrderVars>(CANCEL_ORDER, {
    ...options,
})

