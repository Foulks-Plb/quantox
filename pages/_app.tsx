import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'

import SideMenu from '../utils/components/sideMenu/SideMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideMenu><Component {...pageProps} /></SideMenu>
    </>
  )
}
