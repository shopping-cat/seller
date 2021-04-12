import { gql } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { ProfitReceiptState } from '../constants/type'

export const PROFIT = gql`
  query {
    shop {
        id
        balance
        bankAccountNumber
        bankName
        bankOwnerName
    }
    monthlyProfit
    profitReceipts {
      id
      state
      price
      commission
      createdAt
    }
  }
`
interface ProfitData {
  shop: {
    id: number
    balance: number
    bankAccountNumber: string
    bankName: string
    bankOwnerName: string
  }
  monthlyProfit: number[]
  profitReceipts: {
    id: number
    state: ProfitReceiptState
    price: number
    commission: number
    createdAt: Date
  }[]
}
interface ProfitVars { }
export const useProfit = createQueryHook<ProfitData, ProfitVars>(PROFIT)

export const CREATE_PROFIT_RECEIPT = gql`
  mutation {
    createProfitReceipt {
        id
    } 
  }
`
interface CreateProfitReceiptData {
  createProfitReceipt: {
    id: number
  }
}
interface CreateProfitReceiptVars { }
export const useCreateProfitReceipt = createMutationHook<CreateProfitReceiptData, CreateProfitReceiptVars>(CREATE_PROFIT_RECEIPT)