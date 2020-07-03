import { All, SettingsActionTypes } from '../actions/settings.actions';

export interface State {
    user: Object;
    error: string | null;
    updated: boolean;
}

export const initialState: State = {
    user: undefined,
    error: undefined,
    updated: false,
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case SettingsActionTypes.INIT_SUCCESS: {
            return {
                ...state,
                user: action.payload.user
            };
        }
        case SettingsActionTypes.INIT_FAILURE: {
            return {
                ...state,
                error: 'Error loading User!'
            };
        }
        case SettingsActionTypes.UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                updated: true
            };
        }
        case SettingsActionTypes.UPDATE_USER_FAILURE: {
            return {
                ...state,
                updated: false,
                error: action.payload.error
            };
        }
        default: {
            return state;
        }
    }
}
