const initialStateToast: any = {
  toasts: [],
};

// Action types
const ADD_TOAST = 'ADD_TOAST';
const DELETE_TOAST = 'DELETE_TOAST';

// Action creators
const InstantiateToast = (toast: any, action: string) => {
  return {
    type: action,
    payload: toast,
  };
};

// Reducer
const reducerToast = (state = initialStateToast, { payload, type }: any) => {
  if (type === ADD_TOAST) {
    return {
      ...state,
      toasts: [...state.toasts, payload],
    };
  } else if (type === DELETE_TOAST) {
    const updatedToasts = [...state.toasts];
    updatedToasts.splice(payload, 1);
    return {
      ...state,
      toasts: updatedToasts,
    };
  } else {
    return state;
  }
};

// set toast
export const setToast =
  (message: string, className: string) => async (dispatch: any, getState: any) => {
    const toast = { message: message, className: className };
    dispatch(InstantiateToast(toast, 'ADD_TOAST'));

    setTimeout(() => {
      dispatch(InstantiateToast(toast, 'DELETE_TOAST'));
    }, 6000);
  };

export default reducerToast;
