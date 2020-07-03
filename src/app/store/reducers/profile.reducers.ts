import { User } from '../../models/user';
import { ProfileActionTypes, All } from '../actions/profile.actions';

export interface State {
  user: User | null;
  errorMessage: string | null;
  updated: boolean;
}

export const initialState: State = {
  user: null,
  errorMessage: null,
  updated: false,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_EDIT_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        updated: true,
        errorMessage: null,
      };
    }
    case ProfileActionTypes.PROFILE_EDIT_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error.message,
      };
    }
    default: {
      return state;
    }
  }
}
