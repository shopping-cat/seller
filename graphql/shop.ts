import { gql } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

// QUERY/SHOP
export const SHOP = gql`
  query {
    shop {
        id
        shopName
        shopImage
        rate
        rateNum
        itemNum
        refundInfo
        exchangeInfo
        kakaoLink
        csPhone
        bankAccountNumber
        bankName    
        bankOwnerName
        kakaoId
        managerName
            managerPhone
            managerEmail
        seller {
            id
            email
            licenseNumber
        }   
    }
  }
`
interface ShopData {
    shop: {
        id: number
        shopName: string
        shopImage: string
        rate: number
        rateNum: number
        itemNum: number
        refundInfo: string
        exchangeInfo: string
        kakaoLink: string
        csPhone: string
        bankAccountNumber: string
        bankName: string
        bankOwnerName: string
        kakaoId: string
        managerName: string
        managerPhone: string
        managerEmail: string
        seller: {
            id: number
            email: string
            licenseNumber: string
        }
    }
}
interface ShopVars {

}
export const useShop = createQueryHook<ShopData, ShopVars>(SHOP)



export const UPDATE_SHOP = gql`
    mutation ($input: UpdateShopInput!){
        updateShop (updateShopInput:$input) {
            id
            shopName
            shopImage
            refundInfo
            exchangeInfo
            kakaoLink
            csPhone
            bankAccountNumber
            bankName    
            bankOwnerName
            kakaoId
            managerName
            managerPhone
            managerEmail
        }
    }
`

interface UpdateShopData {
    updateShop: {
        id: number
        shopName: string
        shopImage: string
    }
}
interface UpdateShopVars {
    input: {
        shopName: string
        shopImage: string
        refundInfo: string
        exchangeInfo: string
        kakaoId: string
        kakaoLink: string
        csPhone: string
        bankAccountNumber: string
        bankName: string
        BankOwnerName: string
        managerName: string
        managerPhone: string
        managerEmail: string
    }
}
export const useUpdateShop = createMutationHook<UpdateShopData, UpdateShopVars>(UPDATE_SHOP)



export const CREATE_SHOP = gql`
    mutation ($input: CreateShopInput!){
        createShop (createShopInput:$input) {
            id
            seller {
                email
            }
        }
    }
`

interface CreateShopData {
    createShop: {
        id: number
        seller: {
            email: string
        }
    }
}
interface CreateShopVars {
    input: {
        email: string
        licenseNumber: string
        bizType: string
        bizRegistration: string

        shopName: string
        kakaoId: string

        bankAccountNumber: string
        bankName: string
        bankOwnerName: string

        kakaoLink?: string
        csPhone?: string

        managerName: string
        managerPhone: string
        managerEmail: string

        storeLink?: string
    }
}
export const useCreateShop = createMutationHook<CreateShopData, CreateShopVars>(CREATE_SHOP)

export const UPLOAD_SHOP_IMAGE = gql`
    mutation ($image: Upload!){
        uploadShopImage (image:$image) 
    }
`

interface UploadShopImageData {
    uploadShopImage: string
}
interface UploadShopImageVars {
    image: File
}
export const useUploadShopImage = createMutationHook<UploadShopImageData, UploadShopImageVars>(UPLOAD_SHOP_IMAGE)



export const UPLOAD_ETC_IMAGE = gql`
    mutation ($image: Upload!){
        uploadEtcImage (image:$image) 
    }
`

interface UploadEtcImageData {
    uploadEtcImage: string
}
interface UploadEtcImageVars {
    image: File
}
export const useUploadEtcImage = createMutationHook<UploadEtcImageData, UploadEtcImageVars>(UPLOAD_ETC_IMAGE)
