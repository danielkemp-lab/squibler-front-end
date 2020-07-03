import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
    PROFILE_EDIT = '[Profile] Profile Edit',
    PROFILE_EDIT_SUCCESS = '[Profile] Profile Success',
    PROFILE_EDIT_FAILURE = '[Profile] Profile Failure',
}

export class ProfileEdit implements Action {
    readonly type = ProfileActionTypes.PROFILE_EDIT;
    constructor(public payload: any) { }
}

export class ProfileEditSuccess implements Action {
    readonly type = ProfileActionTypes.PROFILE_EDIT_SUCCESS;
    constructor(public payload: any) { }
}

export class ProfileEditFailure implements Action {
    readonly type = ProfileActionTypes.PROFILE_EDIT_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | ProfileEdit
    | ProfileEditSuccess
    | ProfileEditFailure;
