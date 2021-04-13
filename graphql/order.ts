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
    newOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    onDeliveryOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    completedDeliveryOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    confirmedOrders(limit:5){
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    refundRequestOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    exchangeRequestOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    refundedOrders(limit:5) {
        id
        stringOptionNum
        item {
            id
            name
        }
    }
    exchangedOrders(limit:5) {
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
export const useOrderInfos = createQueryHook<OrderInfosData, OrderInfosVars>(ORDER_INFOS)

// 신구주문 리스트
export const NEW_ORDERS = gql`
  query {
    newOrders(limit:1000) {
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
export const useNewOrders = createQueryHook<NewOrdersData, NewOrdersVars>(NEW_ORDERS)


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
export const useRegistDelivery = createMutationHook<RegistDeliveryData, RegistDeliveryVars>(REGIST_DELIVERY)


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
export const useCancelOrder = createMutationHook<CancelOrderData, CancelOrderVars>(CANCEL_ORDER)




// 배송중인 주문
export const COMPLETED_DELIVERY_ORDERS = gql`
  query{
    onDeliveryOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
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

export interface OnDeliveryOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
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

interface OnDeliveryOrdersData { onDeliveryOrders: OnDeliveryOrder[] }
interface OnDeliveryOrdersVars { }
export const useOnDeliveryOrders = createQueryHook<OnDeliveryOrdersData, OnDeliveryOrdersVars>(COMPLETED_DELIVERY_ORDERS)

// 배송완료주문
export const ON_DELIVERY_ORDERS = gql`
  query{
    completedDeliveryOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
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

export interface CompletedDeliveryOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
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

interface CompletedDeliveryOrdersData { completedDeliveryOrders: CompletedDeliveryOrder[] }
interface CompletedDeliveryOrdersVars { }
export const useCompletedDeliveryOrders = createQueryHook<CompletedDeliveryOrdersData, CompletedDeliveryOrdersVars>(ON_DELIVERY_ORDERS)

// 구매확정주문 offset limit TODO
export const CONFIRMED_ORDERS = gql`
  query{
    confirmedOrders(limit: 1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
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
        itemReview {
            id
            rate
        }
    }
  }
`

export interface ConfirmedOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
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
    itemReview: {
        id: number
        rate: number
    } | null
}

interface ConfirmedOrdersData {
    shop: {
        confirmedOrderNum: number
    }
    confirmedOrders: ConfirmedOrder[]
}
interface ConfirmedOrdersVars { }
export const useConfirmedOrders = createQueryHook<ConfirmedOrdersData, ConfirmedOrdersVars>(CONFIRMED_ORDERS)


// 환불 요청
export const REFUND_REQUEST_ORDERS = gql`
  query{
    refundRequestOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
        reason
        reasonDetail
        state
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

export interface RefundRequestOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
    reason: string
    reasonDetail: string
    state: OrderState
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

interface RefundRequestOrdersData { refundRequestOrders: RefundRequestOrder[] }
interface RefundRequestOrdersVars { }
export const useRefundRequestOrders = createQueryHook<RefundRequestOrdersData, RefundRequestOrdersVars>(REFUND_REQUEST_ORDERS)

// 환불 승인
export const REFUND_ORDER = gql`
  mutation($id:Int!) {
    refundOrder(id:$id) {
        id
        state
    }
  }
`
interface RefundOrderData { }
interface RefundOrderVars { id: number }
export const useRefundOrder = createMutationHook<RefundOrderData, RefundOrderVars>(REFUND_ORDER)


// 교환 요청
export const EXCHANGE_REQUEST_ORDERS = gql`
  query{
    exchangeRequestOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
        reason
        reasonDetail
        state
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

export interface ExchangeRequestOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
    reason: string
    reasonDetail: string
    state: OrderState
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

interface ExchangeRequestOrdersData { exchangeRequestOrders: ExchangeRequestOrder[] }
interface ExchangeRequestOrdersVars { }
export const useExchangeRequestOrders = createQueryHook<ExchangeRequestOrdersData, ExchangeRequestOrdersVars>(EXCHANGE_REQUEST_ORDERS)

// 교환 승인
export const EXCHANGE_ORDER = gql`
  mutation($id:Int!) {
    exchangeOrder(id:$id) {
        id
        state
    }
  }
`
interface ExchangeOrderData { }
interface ExchangeOrderVars { id: number }
export const useExchangeOrder = createMutationHook<ExchangeOrderData, ExchangeOrderVars>(EXCHANGE_ORDER)


// 환불처리된 주문들 offset limit TODO
export const REFUNDED_ORDERS = gql`
  query{
    refundedOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
        reason
        reasonDetail
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

export interface RefundedOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
    reason: string
    reasonDetail: string
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

interface RefundedOrdersData { refundedOrders: RefundedOrder[] }
interface RefundedOrdersVars { }
export const useRefundedOrders = createQueryHook<RefundedOrdersData, RefundedOrdersVars>(REFUNDED_ORDERS)

// 환불처리된 주문들 offset limit TODO
export const EXCHANGED_ORDERS = gql`
  query{
    exchangedOrders(limit:1000){
        id
        stringOptionNum
        deliveryNumber
        deliveryCompany
        deliveryCompletionDate
        reason
        reasonDetail
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

export interface ExchangedOrder {
    id: number
    stringOptionNum: string
    deliveryNumber: string
    deliveryCompany: string
    deliveryCompletionDate: Date
    reason: string
    reasonDetail: string
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

interface ExchangedOrdersData { exchangedOrders: ExchangedOrder[] }
interface ExchangedOrdersVars { }
export const useExchangedOrders = createQueryHook<ExchangedOrdersData, ExchangedOrdersVars>(EXCHANGED_ORDERS)