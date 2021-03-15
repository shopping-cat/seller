import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { client } from '../lib/apollo'

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

  useEffect(() => {
    console.log('load')
  }, [])

  return (
    <>
      {children}
    </>
  )
}