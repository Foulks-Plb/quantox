import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'

import SideMenu from '../utils/components/sideMenu/SideMenu'
import { Provider } from 'react-redux'
import store from '@/utils/store/wallet'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
      <SideMenu>
        <Component {...pageProps} />
      </SideMenu>
      </Provider>
    </>
  )
}
