import { Action } from '@ngrx/store';

export enum SectionActionTypes {
    SECTION_GET_ALL = '[Section] Section Get All',
    SECTION_GET_ALL_SUCCESS = '[Section] Section Get All Success',
    SECTION_GET_ALL_FAILURE = '[Section] Section Get All Failure',
    SECTION_GET_ONE = '[Section] Section Get One',
    SECTION_GET_ONE_SUCCESS = '[Section] Section Get One Success',
    SECTION_GET_ONE_FAILURE = '[Section] Section Get One Failure',
    SECTION_ADD = '[Section] Section Add',
    SECTION_ADD_SUCCESS = '[Section] Section Add Success',
    SECTION_ADD_FAILURE = '[Section] Section Add Failure',
    SECTION_UPDATE = '[Section] Section Update',
    SECTION_UPDATE_SUCCESS = '[Section] Section Update Success',
    SECTION_UPDATE_FAILURE = '[Section] Section Update Failure',
    SECTION_DELETE = '[Section] Section Delete',
    SECTION_DELETE_SUCCESS = '[Section] Section Delete Success',
    SECTION_DELETE_FAILURE = '[Section] Section Delete Failure',
}

export class SectionGetAll implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ALL;
    constructor(public payload: any) { }
}

export class SectionGetAllSuccess implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ALL_SUCCESS;
    constructor(public payload: any) { }
}

export class SectionGetAllFailure implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ALL_FAILURE;
    constructor(public payload: any) { }
}

export class SectionGetOne implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ONE;
    constructor(public payload: any) { }
}

export class SectionGetOneSuccess implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ONE_SUCCESS;
    constructor(public payload: any) { }
}

export class SectionGetOneFailure implements Action {
    readonly type = SectionActionTypes.SECTION_GET_ONE_FAILURE;
    constructor(public payload: any) { }
}

export class SectionAdd implements Action {
    readonly type = SectionActionTypes.SECTION_ADD;
    constructor(public payload: any) { }
}

export class SectionAddSuccess implements Action {
    readonly type = SectionActionTypes.SECTION_ADD_SUCCESS;
    constructor(public payload: any) { }
}

export class SectionAddFailure implements Action {
    readonly type = SectionActionTypes.SECTION_ADD_FAILURE;
    constructor(public payload: any) { }
}

export class SectionUpdate implements Action {
    readonly type = SectionActionTypes.SECTION_UPDATE;
    constructor(public payload: any) { }
}

export class SectionUpdateSuccess implements Action {
    readonly type = SectionActionTypes.SECTION_UPDATE_SUCCESS;
    constructor(public payload: any) { }
}

export class SectionUpdateFailure implements Action {
    readonly type = SectionActionTypes.SECTION_UPDATE_FAILURE;
    constructor(public payload: any) { }
}

export class SectionDelete implements Action {
    readonly type = SectionActionTypes.SECTION_DELETE;
    constructor(public payload: any) { }
}

export class SectionDeleteSuccess implements Action {
    readonly type = SectionActionTypes.SECTION_DELETE_SUCCESS;
    constructor(public payload: any) { }
}

export class SectionDeleteFailure implements Action {
    readonly type = SectionActionTypes.SECTION_DELETE_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | SectionGetOne
    | SectionGetOneSuccess
    | SectionGetOneFailure
    | SectionGetAll
    | SectionGetAllSuccess
    | SectionGetAllFailure
    | SectionAdd
    | SectionAddSuccess
    | SectionAddFailure
    | SectionUpdate
    | SectionUpdateSuccess
    | SectionUpdateFailure
    | SectionDelete
    | SectionDeleteSuccess
    | SectionDeleteFailure;
