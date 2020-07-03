import { Action } from '@ngrx/store';

export enum UploadActionTypes {
  UPLOAD_FILE = '[Upload] Uploading file.',
  UPLOAD_FILE_SUCCESS = '[Upload] Uploading file success.',
  UPLOAD_FILE_FAILURE = '[Upload] Uploading file failed.',
}

export class UploadFile implements Action {
  readonly type = UploadActionTypes.UPLOAD_FILE;
  constructor(public payload: any) {}
}
export class UploadFileSuccess implements Action {
  readonly type = UploadActionTypes.UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}
export class UploadFileFailure implements Action {
  readonly type = UploadActionTypes.UPLOAD_FILE_FAILURE;
  constructor(public payload: any) {}
}
export type All = UploadFile | UploadFileSuccess | UploadFileFailure;
