import { ApolloProvider } from '@apollo/client'
import firebase from 'firebase'
import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { client } from '../lib/apollo'
import { auth } from '../lib/firebase'
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LOGIN_WHITE_LIST } from '../constants/value'



const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <AppContainer>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
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
    console.log(user ? 'loggedin' : 'loggedout')
    if (!user) {
      if (!LOGIN_WHITE_LIST.includes(asPath)) replace('/login')
    } else if (user && asPath === '/login') {
      replace('/dashboard')
    }
  }

  // 로그인 리스너
  useEffect(() => {
    const loginListner = auth.onAuthStateChanged(onAuthStateChanged)
    return loginListner
  }, [])

  if (!logedIn && !LOGIN_WHITE_LIST.includes(asPath)) return null

  return (
    <>
      {children}
    </>
  )
}