import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { DashboardService, ProjectService, SettingsService } from '../../_services';
import {
  AddBoard,
  AddBoardFailure,
  AddBoardSuccess,
  DashboardActionTypes,
  GetProjects,
  GetProjectsFailure,
  GetProjectsSuccess,
  Init,
  InitFailure,
  InitSuccess,
  ProjectCreate,
  ProjectCreateFailure,
  ProjectCreateSuccess,
  ProjectDelete,
  ProjectDeleteFailure,
  ProjectDeleteSuccess,
  ProjectDuplicate,
  ProjectDuplicateFailure,
  ProjectDuplicateSuccess,
  UpdateProjectPhoto,
  UpdateProjectPhotoFailure,
  UpdateProjectPhotoSuccess,
  UserUpdate,
  UserUpdateFailure,
  UserUpdateSuccess,

} from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {

  // tslint:disable-next-line:member-ordering
  @Effect()
  Init: Observable < any > = this.actions
    .ofType(DashboardActionTypes.INIT)
    .map((action: Init) => action.payload)
    .switchMap(_payload => {
      return this.dashboardService.init()
        .then(responseData => {
          const { data } = responseData;
          if (data && data.user && data.user.paymentInfo) {
            localStorage.userId = data.user.uuid;
            localStorage.paymentStatus = data.user.paymentInfo.status;
          }
          if (data) return new InitSuccess(data);
          else return new InitFailure({ error: 'Error!' });
        });
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  InitSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.INIT_SUCCESS)
  );

  @Effect({ dispatch: false })
  InitFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.INIT_FAILURE)
  );
  @Effect()
  GetProjects: Observable < any > = this.actions
    .ofType(DashboardActionTypes.DASHBOARD_GETPROJECTS)
    .map((action: GetProjects) => action.payload)
    .switchMap(_payload => {

      return this.dashboardService.getProjects()
        .map(data => {
          if (data) return new GetProjectsSuccess(data);
          else return new GetProjectsFailure({ error: data.error });
        });
    });

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  GetProjectsSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.DASHBOARD_GETPROJECTS_SUCCESS)
  );

  @Effect({ dispatch: false })
  GetProjectsFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.DASHBOARD_GETPROJECTS_FAILURE)
  );
  @Effect()
  UpdateProjectPhoto: Observable < any > = this.actions
    .ofType(DashboardActionTypes.PROJECT_UPDATEPHOTO)
    .map((action: UpdateProjectPhoto) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .updateProjectPhoto(payload)
        .map((data: any) => {
          if (data.ok) return new UpdateProjectPhotoSuccess({
            projectId: payload.projectId,
            thumbnail: data.projectOutput.project.thumbnail
          });
          else return new UpdateProjectPhotoFailure({ error: data.error });
        });
    });

  @Effect({ dispatch: false })
  UpdateProjectPhotoFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_UPDATEPHOTO_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectPhotoSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_UPDATEPHOTO_SUCCESS)
  );
  @Effect()
  ProjectCreate: Observable < any > = this.actions
    .ofType(DashboardActionTypes.PROJECT_CREATE)
    .map((action: ProjectCreate) => action.payload)
    .switchMap(() => {
      return this.projectService
        .CreateProject()
        .map(data => {
          if (data.ok) return new ProjectCreateSuccess(data);
          else return new ProjectCreateFailure({ error: data.error });

        });
    });

  @Effect({ dispatch: false })
  ProjectCreateSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_CREATE_SUCCESS)
  );

  @Effect({ dispatch: false })
  ProjectCreateFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_CREATE_FAILURE)
  );

  @Effect()
  UserUpdate: Observable < any > = this.actions
    .ofType(DashboardActionTypes.USER_UPDATE)
    .map((action: UserUpdate) => action.payload)
    .switchMap(payload => {
      return this.settingsService.updateUser(payload)
        .map(data => {
          if (data.ok) {
            localStorage.setItem('token', data.token);

            return new UserUpdateSuccess({ user: data.user });
          } else return new UserUpdateFailure({ error: data.error });

        });
    });

  @Effect({ dispatch: false })
  UserUpdateSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.USER_UPDATE_SUCCESS)
  );
  @Effect({ dispatch: false })
  UserUpdateFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.USER_UPDATE_FAILURE)
  );
  @Effect({ dispatch: false })
  GetBoardsSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.GET_BOARDS_SUCCESS)
  );

  @Effect()
  AddBoard: Observable < any > = this.actions
    .ofType(DashboardActionTypes.BOARD_ADD)
    .switchMap(payload => {
      return this.dashboardService
        .createBoard()
        .map((data: any) => {
          return new AddBoardSuccess(data);
        })
        .catch(error => {});
    });

  @Effect()
  ProjectDuplicate: Observable < any > = this.actions
    .ofType(DashboardActionTypes.PROJECT_DUPLICATE)
    .map((action: ProjectDuplicate) => action.payload)
    .switchMap(payload => {
      return this.dashboardService
        .duplicateProject(payload)
        .map((data: any) => {
          if (data.ok) return new ProjectDuplicateSuccess({ project: data.project });
          else return new ProjectDuplicateFailure({ error: data.error });
        });
    });

  @Effect({ dispatch: false })
  ProjectDuplicateFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_DUPLICATE_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectDuplicateSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_DUPLICATE_SUCCESS)
  );

  @Effect()
  ProjectDelete: Observable < any > = this.actions
    .ofType(DashboardActionTypes.PROJECT_DELETE)
    .map((action: ProjectDelete) => action.payload)
    .switchMap(payload => {
      return this.dashboardService
        .deleteProject(payload)
        .map((data: any) => {
          if (data.ok) return new ProjectDeleteSuccess({ id: data.id });
          else return new ProjectDeleteFailure({ error: data.error });
        });
    });

  @Effect({ dispatch: false })
  ProjectDeleteFailure: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_DELETE_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectDeleteSuccess: Observable < any > = this.actions.pipe(
    ofType(DashboardActionTypes.PROJECT_DELETE_SUCCESS)
  );

  constructor(
    private actions: Actions,
    private dashboardService: DashboardService,
    private settingsService: SettingsService,
    private projectService: ProjectService
  ) {}
}
