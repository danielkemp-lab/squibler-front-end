import { SubSectionActionTypes, All } from '../actions/subsection.actions';

export interface State {
  subsections: any;
  errorMessage: string | null;
  updated: boolean;
  created: boolean;
}

export const initialState: State = {
  subsections: null,
  errorMessage: null,
  updated: false,
  created: true,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case SubSectionActionTypes.SUBSECTION_ADD_SUCCESS: {
      return {
        ...state,
        subsections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SubSectionActionTypes.SUBSECTION_ADD_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SubSectionActionTypes.SUBSECTION_GET_ONE_SUCCESS: {
      return {
        ...state,
        subsections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SubSectionActionTypes.SUBSECTION_GET_ONE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SubSectionActionTypes.SUBSECTION_GET_ALL_SUCCESS: {
      return {
        ...state,
        subsections: action.payload.user.data,
        created: true,
        updated: false,
        errorMessage: null,
      };
    }
    case SubSectionActionTypes.SUBSECTION_GET_ALL_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SubSectionActionTypes.SUBSECTION_UPDATE_SUCCESS: {
      return {
        ...state,
        subsections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SubSectionActionTypes.SUBSECTION_UPDATE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SubSectionActionTypes.SUBSECTION_DELETE_SUCCESS: {
      return {
        ...state,
        subsections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SubSectionActionTypes.SUBSECTION_DELETE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    default: {
      return state;
    }
  }
}
