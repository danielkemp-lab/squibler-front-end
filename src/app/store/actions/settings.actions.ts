import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
    INIT = '[Setings] Init.',
    INIT_SUCCESS = '[Settings] Init success',
    INIT_FAILURE = '[Settings] Init failure',
    UPDATE_USER = '[Settings] User update',
    UPDATE_USER_SUCCESS = '[Settings] Update user success',
    UPDATE_USER_FAILURE = '[Settings] Update user failure'
}

export class Init implements Action {
    readonly type = SettingsActionTypes.INIT;
    constructor(public payload: any) { }
}

export class InitSuccess implements Action {
    readonly type = SettingsActionTypes.INIT_SUCCESS;
    constructor(public payload: any) { }
}

export class InitFailure implements Action {
    readonly type = SettingsActionTypes.INIT_FAILURE;
    constructor(public payload: any) { }
}
export class UpdateUser implements Action {
    readonly type = SettingsActionTypes.UPDATE_USER;
    constructor(public payload: any) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = SettingsActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: any) { }
}
export class UpdateUserFailure implements Action {
    readonly type = SettingsActionTypes.UPDATE_USER_FAILURE;
    constructor(public payload: any) { }
}
export type All =
    | Init
    | InitSuccess
    | InitFailure
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFailure;
