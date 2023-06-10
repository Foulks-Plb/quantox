import { configureStore } from '@reduxjs/toolkit';
import reducerToast from './toast';
import reducerWallet from './wallet';
import { storeReducer } from '../types/store';
import reducerPool from './pool';

const reducer: storeReducer = {
    walletReducer: reducerWallet,
    toastReducer: reducerToast,
    poolReducer: reducerPool,
}

const store =  configureStore({ reducer: reducer }); 

export default store;