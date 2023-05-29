import { configureStore } from '@reduxjs/toolkit';
import reducerToast from './toast';
import reducerWallet from './wallet';

const reducer = {
    walletReducer: reducerWallet,
    toastReducer: reducerToast
}

const store =  configureStore({ reducer: reducer }); 

export default store;