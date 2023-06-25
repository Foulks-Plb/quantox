import { getCall } from '../ts/api-base';
import { IWalletPool, StoreWalletProps, IWallet } from '../types/wallet';
import { fetchPoolSuccess } from './pool';

const initialStateWallet: StoreWalletProps = {
  wallet: null,
  isLoading: false,
  error: null,
};

// Action types
const FETCH_WALLET_START = 'FETCH_WALLET_START';
const FETCH_WALLET_SUCCESS = 'FETCH_WALLET_SUCCESS';
const SET_POOL_SUCCESS = 'SET_POOL_SUCCESS';
const FETCH_WALLET_FAILURE = 'FETCH_WALLET_FAILURE';

// Action creators
const fetchWalletStart = () => ({ type: FETCH_WALLET_START });
export const fetchWalletSuccess = (wallet: IWallet) => ({ type: FETCH_WALLET_SUCCESS, payload: wallet });
export const setPoolInWallet = (pool: IWalletPool) => ({ type: SET_POOL_SUCCESS, payload: pool });
const fetchWalletFailure = (error: any) => ({ type: FETCH_WALLET_FAILURE, payload: error });

// Reducer
const reducerWallet = (state = initialStateWallet, action: any) => {
  switch (action.type) {
    case FETCH_WALLET_START:
      return { ...state, isLoading: true };
    case FETCH_WALLET_SUCCESS:
      return { ...state, isLoading: false, wallet: action.payload };
    case SET_POOL_SUCCESS:
      return { ...state, isLoading: false, wallet: { ...state.wallet, pools: action.payload } };
    case FETCH_WALLET_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// Get data
export const getWallet = (force?: boolean) => async (dispatch: any, getState: any) => {
  try {
    dispatch(fetchWalletStart());
    const { walletReducer } = getState();
    const wallet: IWallet = walletReducer.wallet;
    if (wallet?.pools && wallet?.tokens && !force) {
      return wallet;
    }

    const response: IWallet = await getCall('/api/wallet');
    dispatch(fetchWalletSuccess(response));
    
    dispatch(fetchPoolSuccess(response.pools));
    return response;
  } catch (error) {
    dispatch(fetchWalletFailure(error));
  }
};

export default reducerWallet;