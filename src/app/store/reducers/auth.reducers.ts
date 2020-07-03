import { All, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  errorMessage: string | null;
  isValidEmail: boolean;
  isValidCode: boolean;
  signupsuccess: boolean;
}

export const initialState: State = {
  signupsuccess: false,
  errorMessage: null,
  isValidEmail: false,
  isValidCode: false
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }
    case AuthActionTypes.SIGNUP: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }
    case AuthActionTypes.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isValidEmail: true
      };
    }
    case AuthActionTypes.FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
