import { Action } from '@ngrx/store';

export enum SubSectionActionTypes {
    SUBSECTION_GET_ALL = '[SubSection] SubSection Get All',
    SUBSECTION_GET_ALL_SUCCESS = '[SubSection] SubSection Get All Success',
    SUBSECTION_GET_ALL_FAILURE = '[SubSection] SubSection Get All Failure',
    SUBSECTION_GET_ONE = '[SubSection] SubSection Get One',
    SUBSECTION_GET_ONE_SUCCESS = '[SubSection] SubSection Get One Success',
    SUBSECTION_GET_ONE_FAILURE = '[SubSection] SubSection Get One Failure',
    SUBSECTION_ADD = '[SubSection] SubSection Add',
    SUBSECTION_ADD_SUCCESS = '[SubSection] SubSection Add Success',
    SUBSECTION_ADD_FAILURE = '[SubSection] SubSection Add Failure',
    SUBSECTION_UPDATE = '[SubSection] SubSection Update',
    SUBSECTION_UPDATE_SUCCESS = '[SubSection] SubSection Update Success',
    SUBSECTION_UPDATE_FAILURE = '[SubSection] SubSection Update Failure',
    SUBSECTION_DELETE = '[SubSection] SubSection Delete',
    SUBSECTION_DELETE_SUCCESS = '[SubSection] SubSection Delete Success',
    SUBSECTION_DELETE_FAILURE = '[SubSection] SubSection Delete Failure',
}

export class SubSectionGetAll implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ALL;
    constructor(public payload: any) { }
}

export class SubSectionGetAllSuccess implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ALL_SUCCESS;
    constructor(public payload: any) { }
}

export class SubSectionGetAllFailure implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ALL_FAILURE;
    constructor(public payload: any) { }
}

export class SubSectionGetOne implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ONE;
    constructor(public payload: any) { }
}

export class SubSectionGetOneSuccess implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ONE_SUCCESS;
    constructor(public payload: any) { }
}

export class SubSectionGetOneFailure implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_GET_ONE_FAILURE;
    constructor(public payload: any) { }
}

export class SubSectionAdd implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_ADD;
    constructor(public payload: any) { }
}

export class SubSectionAddSuccess implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_ADD_SUCCESS;
    constructor(public payload: any) { }
}

export class SubSectionAddFailure implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_ADD_FAILURE;
    constructor(public payload: any) { }
}

export class SubSectionUpdate implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_UPDATE;
    constructor(public payload: any) { }
}

export class SubSectionUpdateSuccess implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_UPDATE_SUCCESS;
    constructor(public payload: any) { }
}

export class SubSectionUpdateFailure implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_UPDATE_FAILURE;
    constructor(public payload: any) { }
}

export class SubSectionDelete implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_DELETE;
    constructor(public payload: any) { }
}

export class SubSectionDeleteSuccess implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_DELETE_SUCCESS;
    constructor(public payload: any) { }
}

export class SubSectionDeleteFailure implements Action {
    readonly type = SubSectionActionTypes.SUBSECTION_DELETE_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | SubSectionGetOne
    | SubSectionGetOneSuccess
    | SubSectionGetOneFailure
    | SubSectionGetAll
    | SubSectionGetAllSuccess
    | SubSectionGetAllFailure
    | SubSectionAdd
    | SubSectionAddSuccess
    | SubSectionAddFailure
    | SubSectionUpdate
    | SubSectionUpdateSuccess
    | SubSectionUpdateFailure
    | SubSectionDelete
    | SubSectionDeleteSuccess
    | SubSectionDeleteFailure;
