import { gql } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

export const DASHBOARD = gql`
  query {
    shop {
        id
        balance
        newOrderNum
        onDeliveryOrderNum
        completedDeliveryOrderNum
        confirmedOrderNum
        refundRequestOrderNum
        exchangeRequestOrderNum
        refundedOrderNum
        exchangedOrderNum
    }
    recentReviews(limit:5) {
      id
      content
      rate
    }
    monthlyProfit
  }
`
interface DashboardData {
  shop: {
    id: number
    balance: number
    newOrderNum: number
    onDeliveryOrderNum: number
    completedDeliveryOrderNum: number
    confirmedOrderNum: number
    refundRequestOrderNum: number
    exchangeRequestOrderNum: number
    refundedOrderNum: number
    exchangedOrderNum: number
  }
  recentReviews: {
    id: number
    content: string
    rate: number
  }[]
  monthlyProfit: number[]
}
interface DashboardVars {

}
export const useDashboard = createQueryHook<DashboardData, DashboardVars>(DASHBOARD)