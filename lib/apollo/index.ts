import { ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import cache from './cache'
import { createUploadLink } from 'apollo-upload-client';
import { auth } from '../firebase';

const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
    credentials: 'include', // 쿠키를 위한 용도
})

const authLink = setContext(async (_, { headers }) => {
    // 파이어베이스에서 해당 유저의 계정 토큰을 받아서 header에 authorization 속성에 추가
    const token = await auth.currentUser?.getIdToken(false)
    // console.log('token ' + token)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.NODE_ENV !== 'production',
})