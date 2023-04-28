import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getCall } from '../ts/api-base';

const initialStateTokens = {
  tokens: null,
  isLoading: false,
  error: null,
};

// Action types
const FETCH_TOKENS_START = 'FETCH_TOKENS_START';
const FETCH_TOKENS_SUCCESS = 'FETCH_TOKENS_SUCCESS';
const FETCH_TOKENS_FAILURE = 'FETCH_TOKENS_FAILURE';

// Action creators
const fetchTokensStart = () => ({ type: FETCH_TOKENS_START });
const fetchTokensSuccess = (tokens: any) => ({ type: FETCH_TOKENS_SUCCESS, payload: tokens });
const fetchTokensFailure = (error: any) => ({ type: FETCH_TOKENS_FAILURE, payload: error });

// Reducer
const reducer = (state = initialStateTokens, action: any) => {
  switch (action.type) {
    case FETCH_TOKENS_START:
      return { ...state, isLoading: true };
    case FETCH_TOKENS_SUCCESS:
      return { ...state, isLoading: false, tokens: action.payload };
    case FETCH_TOKENS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// Get data
export const fetchTokens = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(fetchTokensStart());
    const { tokens } = getState();
    if (tokens) {
      return;
    }

    const response = await getCall('/api/tokens');
    dispatch(fetchTokensSuccess(response));
  } catch (error) {
    dispatch(fetchTokensFailure(error));
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;