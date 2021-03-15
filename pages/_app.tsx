import { ApolloProvider } from '@apollo/client'
import firebase from 'firebase'
import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { client } from '../lib/apollo'
import { auth } from '../lib/firebase'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ApolloProvider>
    </>
  )
}

export default App

const AppContainer: React.FC = ({ children }) => {

  const { replace, route } = useRouter()

  const onAuthStateChanged = async (user: firebase.User) => {
    try {
      if (user) {
        console.log('logged in')
        replace('/home')
      } else {
        console.log('logged out')
        replace('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 로그인 리스너
  useEffect(() => {
    const loginListner = auth.onAuthStateChanged(onAuthStateChanged)
    return loginListner
  }, [])

  return (
    <>
      {children}
    </>
  )
}