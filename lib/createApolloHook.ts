import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError } from "@apollo/client"
import { DocumentNode } from "graphql"

const ERROR_SIMBOL = 'ERRORMESSAGE@'

const errorLogger = (error: ApolloError) => {
    if (process.env.NODE_ENV !== 'production') console.log(error.message)
    let errorMessage = ''
    if (error.message.substr(0, ERROR_SIMBOL.length) === ERROR_SIMBOL) errorMessage = error.message.substr(ERROR_SIMBOL.length)
    else errorMessage = '알 수 없는 오류'
    alert(errorMessage)
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
