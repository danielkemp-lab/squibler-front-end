import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  GAUTH = '[Auth] Google auth',
  FAUTH = '[Auth] Facebook auth',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  FORGOT_PASSWORD = '[Auth] Forgot password',
  FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot password success',
  FORGOT_PASSWORD_FAILURE = '[Auth] Forgot password failure',
  RESET_PASSWORD = '[Auth] Reset password ',
  RESET_PASSWORD_SUCCESS = '[Auth] Reset password success',
  RESET_PASSWORD_FAILURE = '[Auth] Reset password failure',
}
export class Gauth implements Action {
  readonly type = AuthActionTypes.GAUTH;
  constructor(public payload: any) { }
}

export class Fauth implements Action {
  readonly type = AuthActionTypes.FAUTH;
  constructor(public payload: any) { }
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) { }
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) { }
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;
  constructor(public payload: any) { }
}

export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: any) { }
}

export class ForgotPasswordFailure implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_FAILURE;
  constructor(public payload: any) { }
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;
  constructor(public payload: any) { }
}

export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;
  constructor(public payload: any) { }
}

export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export type All =
  | Gauth
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | GetStatus;
