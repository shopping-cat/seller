import { ApolloProvider } from '@apollo/client'
import firebase from 'firebase'
import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { client } from '../lib/apollo'
import { auth } from '../lib/firebase'
import 'antd/dist/antd.css';



const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <AppContainer>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContainer>
      </ApolloProvider>
    </>
  )
}

export default App

const AppContainer: React.FC = ({ children }) => {

  const { replace } = useRouter()

  const onAuthStateChanged = async (user: firebase.User) => {
    try {
      if (user) {
        console.log('logged in')
        replace('/dashboard')
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