import { gql } from "@apollo/client/core"
import { createMutationHook } from '../lib/createApolloHook'

// QUERY/CREATE_ITEM_IMAGE
export const CREATE_ITEM_IMAGE = gql`
  mutation($image:Upload!) {
    createItemImage(image: $image) {
        id
        uri
    }
  }
`

export interface CreateItemImage {
    id: number
    uri: string
}

interface CreateItemImageData {
    createItemImage: CreateItemImage
}
interface CreateItemImageVars {
    image: File
}
export const useCreateItemImage = createMutationHook<CreateItemImageData, CreateItemImageVars>(CREATE_ITEM_IMAGE)