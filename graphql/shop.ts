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
    }
}
export const useUpdateShop = createMutationHook<UpdateShopData, UpdateShopVars>(UPDATE_SHOP)


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
