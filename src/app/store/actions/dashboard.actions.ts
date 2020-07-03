import { Action } from '@ngrx/store';
export enum DashboardActionTypes {
  GET_BOARDS_SUCCESS = '[Dashboard] Get board success',
  INIT = '[Dashboard] Init.',
  INIT_SUCCESS = '[Dashboard] Init success',
  INIT_FAILURE = '[Dashboard] Init failure',
  BOARD_ADD = '[Dashboard] Add board.',
  BOARD_ADD_SUCCESS = '[Dashboard] Add board success',
  BOARD_ADD_FAILURE = '[Dashboard] Add board failure',
  USER_UPDATE = '[Dashboard] Update user',
  USER_UPDATE_SUCCESS = '[Dashboard] Update user success',
  USER_UPDATE_FAILURE = '[Dashboard] Update user failure',
  PROJECT_UPDATEPHOTO = '[Project] - Upload project photo',
  PROJECT_UPDATEPHOTO_SUCCESS = '[Project] - Updaod project photo success',
  PROJECT_UPDATEPHOTO_FAILURE = '[Project] - Upload project photo failure',
  PROJECT_CREATE = '[Dashboard] - Create new project',
  PROJECT_CREATE_SUCCESS = '[Dashboard] - Project create success',
  PROJECT_CREATE_FAILURE = '[Dashboard] - Project create failure',
  PROJECT_DUPLICATE = '[Dashboard] - Duplicate project',
  PROJECT_DUPLICATE_SUCCESS = '[Dashboard] - Duplicate project success',
  PROJECT_DUPLICATE_FAILURE = '[Dashboard] - Duplicate project failure',
  PROJECT_DELETE = '[Dashboard] - Delete project',
  PROJECT_DELETE_SUCCESS = '[Dashboard] - Delete project success',
  PROJECT_DELETE_FAILURE = '[Dashboard] - Delete project failure',
  BOARD_UPDATENAME = '[Dashboard] - Update board name',
  BOARD_DELETE = '[Dashboard] - Delete board',
  BOARD_UPDATECOLOR = '[Dashboard] - Update board color',
  BOARD_UPDATEICON = '[Dashboard] - Update board icon',
  DASHBOARD_GETPROJECTS = '[Dashboard] - Get all projects',
  DASHBOARD_GETPROJECTS_SUCCESS = '[Dashboard] - Get all projects success',
  DASHBOARD_GETPROJECTS_FAILURE = '[Dashboard] - Get all projects failure'
}

export class Init implements Action {
  readonly type = DashboardActionTypes.INIT;
  constructor(public payload: any) { }
}

export class InitSuccess implements Action {
  readonly type = DashboardActionTypes.INIT_SUCCESS;
  constructor(public payload: any) { }
}

export class InitFailure implements Action {
  readonly type = DashboardActionTypes.INIT_FAILURE;
  constructor(public payload: any) { }
}

export class AddBoard implements Action {
  readonly type = DashboardActionTypes.BOARD_ADD;
  constructor(public payload: any) { }
}
export class AddBoardSuccess implements Action {
  readonly type = DashboardActionTypes.BOARD_ADD_SUCCESS;
  constructor(public payload: any) { }
}
export class AddBoardFailure implements Action {
  readonly type = DashboardActionTypes.BOARD_ADD_FAILURE;
  constructor(public payload: any) { }
}
export class UserUpdate implements Action {
  readonly type = DashboardActionTypes.USER_UPDATE;
  constructor(public payload: any) { }
}

export class UserUpdateSuccess implements Action {
  readonly type = DashboardActionTypes.USER_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class UserUpdateFailure implements Action {
  readonly type = DashboardActionTypes.USER_UPDATE_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateProjectPhoto implements Action {
  readonly type = DashboardActionTypes.PROJECT_UPDATEPHOTO;
  constructor(public payload: any) { }
}

export class UpdateProjectPhotoSuccess implements Action {
  readonly type = DashboardActionTypes.PROJECT_UPDATEPHOTO_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateProjectPhotoFailure implements Action {
  readonly type = DashboardActionTypes.PROJECT_UPDATEPHOTO_FAILURE;
  constructor(public payload: any) { }
}
export class ProjectCreate implements Action {
  readonly type = DashboardActionTypes.PROJECT_CREATE;
  constructor(public payload: any) { }
}

export class ProjectCreateSuccess implements Action {
  readonly type = DashboardActionTypes.PROJECT_CREATE_SUCCESS;
  constructor(public payload: any) { }
}
export class ProjectCreateFailure implements Action {
  readonly type = DashboardActionTypes.PROJECT_CREATE_FAILURE;
  constructor(public payload: any) { }
}
export class ProjectDuplicate implements Action {
  readonly type = DashboardActionTypes.PROJECT_DUPLICATE;
  constructor(public payload: any) { }
}

export class ProjectDuplicateSuccess implements Action {
  readonly type = DashboardActionTypes.PROJECT_DUPLICATE_SUCCESS;
  constructor(public payload: any) { }
}
export class ProjectDuplicateFailure implements Action {
  readonly type = DashboardActionTypes.PROJECT_DUPLICATE_FAILURE;
  constructor(public payload: any) { }
}
export class ProjectDelete implements Action {
  readonly type = DashboardActionTypes.PROJECT_DELETE;
  constructor(public payload: any) { }
}

export class ProjectDeleteSuccess implements Action {
  readonly type = DashboardActionTypes.PROJECT_DELETE_SUCCESS;
  constructor(public payload: any) { }
}
export class ProjectDeleteFailure implements Action {
  readonly type = DashboardActionTypes.PROJECT_DELETE_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateListBoardName implements Action {
  readonly type = DashboardActionTypes.BOARD_UPDATENAME;
  constructor(public payload: any) { }
}

export class UpdateListBoardColor implements Action {
  readonly type = DashboardActionTypes.BOARD_UPDATECOLOR;
  constructor(public payload: any) { }
}
export class UpdateListBoardIcon implements Action {
  readonly type = DashboardActionTypes.BOARD_UPDATEICON;
  constructor(public payload: any) { }
}
export class DeleteListBoard implements Action {
  readonly type = DashboardActionTypes.BOARD_DELETE;
  constructor(public payload: any) { }
}
export class GetProjects implements Action {
  readonly type = DashboardActionTypes.DASHBOARD_GETPROJECTS;
  constructor(public payload: any) { }
}

export class GetProjectsSuccess implements Action {
  readonly type = DashboardActionTypes.DASHBOARD_GETPROJECTS_SUCCESS;
  constructor(public payload: any) { }
}
export class GetProjectsFailure implements Action {
  readonly type = DashboardActionTypes.DASHBOARD_GETPROJECTS_FAILURE;
  constructor(public payload: any) { }
}
export type All =
  | Init
  | InitSuccess
  | InitFailure
  | AddBoard
  | AddBoardSuccess
  | UserUpdateFailure
  | UserUpdate
  | UserUpdateSuccess
  | AddBoardFailure
  | UpdateProjectPhoto
  | UpdateProjectPhotoFailure
  | UpdateProjectPhotoSuccess
  | ProjectCreate
  | ProjectCreateSuccess
  | ProjectCreateFailure
  | ProjectDuplicate
  | ProjectDuplicateSuccess
  | ProjectDuplicateFailure
  | ProjectDelete
  | ProjectDeleteSuccess
  | ProjectDeleteFailure
  | UpdateListBoardName
  | DeleteListBoard
  | UpdateListBoardColor
  | UpdateListBoardIcon
  | GetProjects
  | GetProjectsSuccess
  | GetProjectsFailure;
