import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import SideMenu from '../utils/components/sideMenu/SideMenu';
import { Provider } from 'react-redux';
import Toast from '@/utils/components/toast/Toast';
import storeWallet from '@/utils/store/wallet';
import store from '@/utils/store/store';

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
              <Toast />
            </SideMenu>
        </Provider>
      </SessionProvider>
    </div>
  );
}

// to deploy pool
