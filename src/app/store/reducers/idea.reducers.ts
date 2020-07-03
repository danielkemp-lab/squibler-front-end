import { All, IdeaActionTypes } from '../actions/idea.actions';

export interface State {
  ideas: any;
  errorMessage: string | null;
  updated: boolean;
  ideaInitSuccess: boolean;
  created: boolean;
}

export const initialState: State = {
  ideas: null,
  errorMessage: null,
  updated: false,
  ideaInitSuccess: false,
  created: true
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case IdeaActionTypes.IDEA_ADD_SUCCESS: {
      return {
        ...state,
        ideas: action.payload.user,
        created: true,
        updated: true,
        ideaInitSuccess: true,
        errorMessage: null
      };
    }
    case IdeaActionTypes.IDEA_ADD_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case IdeaActionTypes.IDEA_GET_ONE_SUCCESS: {
      return {
        ...state,
        ideas: action.payload.user,
        created: true,
        updated: true,
        ideaInitSuccess: false,
        errorMessage: null
      };
    }
    case IdeaActionTypes.IDEA_GET_ONE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case IdeaActionTypes.IDEA_GET_ALL_SUCCESS: {
      return {
        ...state,
        ideas: action.payload.user.data,
        created: true,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: null
      };
    }
    case IdeaActionTypes.IDEA_GET_ALL_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case IdeaActionTypes.IDEA_UPDATE_SUCCESS: {
      return {
        ...state,
        ideas: action.payload.user,
        created: false,
        updated: true,
        ideaInitSuccess: false,
        errorMessage: null
      };
    }
    case IdeaActionTypes.IDEA_UPDATE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case IdeaActionTypes.IDEA_DELETE_SUCCESS: {
      return {
        ...state,
        ideas: action.payload.user,
        created: true,
        updated: true,
        ideaInitSuccess: false,
        errorMessage: null
      };
    }
    case IdeaActionTypes.IDEA_DELETE_FAILURE: {
      return {
        ...state,
        created: false,
        updated: false,
        ideaInitSuccess: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    default: {
      return state;
    }
  }
}
