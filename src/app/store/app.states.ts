import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';
import * as profile from './reducers/profile.reducers';
import * as project from './reducers/project.reducers';
import * as section from './reducers/section.reducers';
import * as subsection from './reducers/subsection.reducers';
import * as idea from './reducers/idea.reducers';
import * as payment from './reducers/payment.reducers';
import * as upload from './reducers/upload.reducers';
import * as dashboard from './reducers/dashboard.reducers';
import * as settings from './reducers/settings.reducers';
import * as board from './reducers/board.reducers';

export interface AppState {
  authState: auth.State;
  profileState: profile.State;
  projectState: project.State;
  sectionState: section.State;
  subsection: subsection.State;
  idea: idea.State;
  payment: payment.State;
  upload: upload.State;
  dashboard: dashboard.State;
  settings: settings.State;
}

export const reducers = {
  auth: auth.reducer,
  profile: profile.reducer,
  project: project.reducer,
  section: section.reducer,
  subsection: subsection.reducer,
  idea: idea.reducer,
  payment: payment.reducer,
  upload: upload.reducer,
  dashboard: dashboard.reducer,
  settings: settings.reducer,
  board: board.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectProfileState = createFeatureSelector<AppState>('profile');
export const selectProjectState = createFeatureSelector<AppState>('project');
export const selectSectionState = createFeatureSelector<AppState>('section');
export const selectSubSectionState = createFeatureSelector<AppState>(
  'subsection'
);
export const selectIdeaState = createFeatureSelector<AppState>('idea');
export const selectPaymentState = createFeatureSelector<AppState>('payment');
export const selectUploadState = createFeatureSelector<AppState>('upload');
export const selectDashboardState = createFeatureSelector<AppState>(
  'dashboard'
);
export const selectSettingsState = createFeatureSelector<AppState>('settings');
export const selectBoardState = createFeatureSelector<AppState>('board');
