import '../styles/globals.css'
import '../styles/nav.css'
import '../styles/index.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { I18nProvider } from '../context/i18nContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <Layout>
        <ToastContainer limit={1} />
        <Component {...pageProps} />
      </Layout>
    </I18nProvider>
  )
}

export default MyApp
