import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import SideMenu from '../utils/components/sideMenu/SideMenu';
import { Provider } from 'react-redux';
import store from '@/utils/store/wallet';

export default function App({
  Component,
  pageProps: { session, pageProps },
}: AppProps) {
  return (
    <div className="application">
      <SessionProvider session={session}>
        <Provider store={store}>
          <SideMenu>
            <Component {...pageProps} />
          </SideMenu>
        </Provider>
      </SessionProvider>
    </div>
  );
}
