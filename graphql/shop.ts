import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client"
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
        seller: {
            id: number
            email: string
            licenseNumber: string
        }
    }
}
interface ShopVars {

}
export const useShop = (options?: QueryHookOptions<ShopData, ShopVars>) => createQueryHook<ShopData, ShopVars>(SHOP, {
    ...options,
})



export const UPDATE_SHOP = gql`
    mutation ($input: UpdateShopInput!){
        updateShop (updateShopInput:$input) {
            id
            shopName
            shopImage
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
export const useUpdateShop = (options?: MutationHookOptions<UpdateShopData, UpdateShopVars>) => createMutationHook<UpdateShopData, UpdateShopVars>(UPDATE_SHOP, {
    ...options,
})


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
export const useUploadShopImage = (options?: MutationHookOptions<UploadShopImageData, UploadShopImageVars>) => createMutationHook<UploadShopImageData, UploadShopImageVars>(UPLOAD_SHOP_IMAGE, {
    ...options,
})
