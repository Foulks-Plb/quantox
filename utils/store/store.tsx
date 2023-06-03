import { configureStore } from '@reduxjs/toolkit';
import reducerToast from './toast';
import reducerWallet from './wallet';
import { storeReducer } from '../types/store';

const reducer: storeReducer = {
    walletReducer: reducerWallet,
    toastReducer: reducerToast
}

const store =  configureStore({ reducer: reducer }); 

export default store;