import { ApolloProvider } from '@apollo/client'
import firebase from 'firebase'
import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
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

  const { replace, asPath } = useRouter()
  const [logedIn, setLogedIn] = useState(false)

  const onAuthStateChanged = async (user: firebase.User) => {
    setLogedIn(!!user)
    if (!user) {
      replace('/login')
    } else if (user && asPath === '/login') {
      replace('/dashboard')
    }
  }

  // 로그인 리스너
  useEffect(() => {
    const loginListner = auth.onAuthStateChanged(onAuthStateChanged)
    return loginListner
  }, [])

  if (!logedIn && asPath !== '/login') return null

  return (
    <>
      {children}
    </>
  )
}