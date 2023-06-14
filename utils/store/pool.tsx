import { getCall } from '../ts/api-base';
import { StorePoolProps } from '../types/wallet';

const initialStatePool: StorePoolProps = {
  pool: null,
  isLoading: false,
  error: null,
};

// Action types
const FETCH_POOL_START = 'FETCH_POOL_START';
const FETCH_POOL_SUCCESS = 'FETCH_POOL_SUCCESS';
const FETCH_POOL_FAILURE = 'FETCH_POOL_FAILURE';

// Action creators
const fetchPoolStart = () => ({ type: FETCH_POOL_START });
const fetchPoolSuccess = (pool: any) => ({ type: FETCH_POOL_SUCCESS, payload: pool });
const fetchPoolFailure = (error: any) => ({ type: FETCH_POOL_FAILURE, payload: error });

// Reducer
const reducerPool = (state = initialStatePool, action: any) => {
  switch (action.type) {
    case FETCH_POOL_START:
      return { ...state, isLoading: true };
    case FETCH_POOL_SUCCESS:
      return { ...state, isLoading: false, pool: action.payload };
    case FETCH_POOL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// Get data
export const getPool = (force?: boolean) => async (dispatch: any, getState: any) => {
  try {
    dispatch(fetchPoolStart());
    const { poolReducer } = getState();
    const pool = poolReducer.pool;
    if (pool && !force) {
      return pool;
    }

    const response = await getCall('/api/pools/pools');
    dispatch(fetchPoolSuccess(response));
    return response;
  } catch (error) {
    dispatch(fetchPoolFailure(error));
  }
};

export default reducerPool;