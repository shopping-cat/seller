import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError } from "@apollo/client"
import { DocumentNode } from "graphql"

const errorLogger = (error: ApolloError) => {
    if (process.env.NODE_ENV !== 'production') console.log(error.message)
    alert(error.message)
}

export const createQueryHook = <Data, Vars>(query: DocumentNode, preOptions?: QueryHookOptions<Data, Vars>) => (options?: QueryHookOptions<Data, Vars>) =>
    useQuery<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })


export const createMutationHook = <Data, Vars>(query: DocumentNode, preOptions?: MutationHookOptions<Data, Vars>) => (options?: MutationHookOptions<Data, Vars>) =>
    useMutation<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })


