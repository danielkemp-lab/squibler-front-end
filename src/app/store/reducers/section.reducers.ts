import { SectionActionTypes, All } from '../actions/section.actions';

export interface State {
  sections: any;
  errorMessage: string | null;
  updated: boolean;
  created: boolean;
}

export const initialState: State = {
  sections: null,
  errorMessage: null,
  updated: false,
  created: true,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case SectionActionTypes.SECTION_ADD_SUCCESS: {
      return {
        ...state,
        sections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SectionActionTypes.SECTION_ADD_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SectionActionTypes.SECTION_GET_ONE_SUCCESS: {
      return {
        ...state,
        sections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SectionActionTypes.SECTION_GET_ONE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SectionActionTypes.SECTION_GET_ALL_SUCCESS: {
      return {
        ...state,
        sections: action.payload.user.data,
        created: true,
        updated: false,
        errorMessage: null,
      };
    }
    case SectionActionTypes.SECTION_GET_ALL_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SectionActionTypes.SECTION_UPDATE_SUCCESS: {
      return {
        ...state,
        sections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SectionActionTypes.SECTION_UPDATE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case SectionActionTypes.SECTION_DELETE_SUCCESS: {
      return {
        ...state,
        sections: action.payload.user,
        created: true,
        updated: true,
        errorMessage: null,
      };
    }
    case SectionActionTypes.SECTION_DELETE_FAILURE: {
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
