import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError } from "@apollo/client"
import { DocumentNode } from "graphql"

const errorLogger = (error: ApolloError) => {
    if (process.env.NODE_ENV !== 'production') console.log(error.message)
    alert(error.message)
}

export const createMutationHook = <Data, Vars>(mutation: DocumentNode, options?: MutationHookOptions<Data, Vars>) =>
    useMutation<Data, Vars>(mutation, {
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        }
    })

export const createQueryHook = <Data, Vars>(query: DocumentNode, options?: QueryHookOptions<Data, Vars>) =>
    useQuery<Data, Vars>(query, {
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })
