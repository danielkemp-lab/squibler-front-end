import { All, PaymentActionTypes } from '../actions/payment.actions';

export interface State {
  message: string;
  status: string;
  error: string;
}

export const initialState: State = {
  message: '',
  status: '',
  error: ''
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case PaymentActionTypes.PAYMENT_UPDATE_CARD_SUCCESS: {
      return {
        ...state,
        status: action.payload.ok,
        message: action.payload.message,
      };
    }
    case PaymentActionTypes.PAYMENT_UPDATE_CARD_FAILURE: {
      return {
        ...state,
        status: action.payload.ok,
        error: action.payload.message
      };
    }
    case PaymentActionTypes.PAYMENT_REMOVE_CARD_SUCCESS: {
      return {
        ...state,
        status: action.payload.ok,
        message: action.payload.message
      };
    }
    case PaymentActionTypes.PAYMENT_REMOVE_CARD_FAILURE: {
      return {
        ...state,
        status: action.payload.ok,
        message: action.payload.error.message
      };
    }
    default: {
      return state;
    }
  }
}
