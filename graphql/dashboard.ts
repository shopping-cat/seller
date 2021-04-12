import { gql } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

export const DASHBOARD = gql`
  query {
    shop {
        id
        balance
    }
    monthlyProfit
  }
`
interface DashboardData {
    shop: {
        id: number
        balance: number
    }
    monthlyProfit: number[]
}
interface DashboardVars {

}
export const useDashboard = createQueryHook<DashboardData, DashboardVars>(DASHBOARD)