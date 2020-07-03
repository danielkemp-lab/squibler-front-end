import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
    IDEA_GET_ALL = '[Idea] Idea Get All',
    IDEA_GET_ALL_SUCCESS = '[Idea] Idea Get All Success',
    IDEA_GET_ALL_FAILURE = '[Idea] Idea Get All Failure',
    IDEA_GET_ONE = '[Idea] Idea Get One',
    IDEA_GET_ONE_SUCCESS = '[Idea] Idea Get One Success',
    IDEA_GET_ONE_FAILURE = '[Idea] Idea Get One Failure',
    IDEA_ADD = '[Idea] Idea Add',
    IDEA_ADD_SUCCESS = '[Idea] Idea Add Success',
    IDEA_ADD_FAILURE = '[Idea] Idea Add Failure',
    IDEA_UPDATE = '[Idea] Idea Update',
    IDEA_UPDATE_SUCCESS = '[Idea] Idea Update Success',
    IDEA_UPDATE_FAILURE = '[Idea] Idea Update Failure',
    IDEA_DELETE = '[Idea] Idea Delete',
    IDEA_DELETE_SUCCESS = '[Idea] Idea Delete Success',
    IDEA_DELETE_FAILURE = '[Idea] Idea Delete Failure',
}

export class IdeaGetAll implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ALL;
    constructor(public payload: any) { }
}

export class IdeaGetAllSuccess implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ALL_SUCCESS;
    constructor(public payload: any) { }
}

export class IdeaGetAllFailure implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ALL_FAILURE;
    constructor(public payload: any) { }
}

export class IdeaGetOne implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ONE;
    constructor(public payload: any) { }
}

export class IdeaGetOneSuccess implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ONE_SUCCESS;
    constructor(public payload: any) { }
}

export class IdeaGetOneFailure implements Action {
    readonly type = IdeaActionTypes.IDEA_GET_ONE_FAILURE;
    constructor(public payload: any) { }
}

export class IdeaAdd implements Action {
    readonly type = IdeaActionTypes.IDEA_ADD;
    constructor(public payload: any) { }
}

export class IdeaAddSuccess implements Action {
    readonly type = IdeaActionTypes.IDEA_ADD_SUCCESS;
    constructor(public payload: any) { }
}

export class IdeaAddFailure implements Action {
    readonly type = IdeaActionTypes.IDEA_ADD_FAILURE;
    constructor(public payload: any) { }
}

export class IdeaUpdate implements Action {
    readonly type = IdeaActionTypes.IDEA_UPDATE;
    constructor(public payload: any) { }
}

export class IdeaUpdateSuccess implements Action {
    readonly type = IdeaActionTypes.IDEA_UPDATE_SUCCESS;
    constructor(public payload: any) { }
}

export class IdeaUpdateFailure implements Action {
    readonly type = IdeaActionTypes.IDEA_UPDATE_FAILURE;
    constructor(public payload: any) { }
}

export class IdeaDelete implements Action {
    readonly type = IdeaActionTypes.IDEA_DELETE;
    constructor(public payload: any) { }
}

export class IdeaDeleteSuccess implements Action {
    readonly type = IdeaActionTypes.IDEA_DELETE_SUCCESS;
    constructor(public payload: any) { }
}

export class IdeaDeleteFailure implements Action {
    readonly type = IdeaActionTypes.IDEA_DELETE_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | IdeaGetOne
    | IdeaGetOneSuccess
    | IdeaGetOneFailure
    | IdeaGetAll
    | IdeaGetAllSuccess
    | IdeaGetAllFailure
    | IdeaAdd
    | IdeaAddSuccess
    | IdeaAddFailure
    | IdeaUpdate
    | IdeaUpdateSuccess
    | IdeaUpdateFailure
    | IdeaDelete
    | IdeaDeleteSuccess
    | IdeaDeleteFailure;
