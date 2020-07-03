import { Injectable, forwardRef, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { IdeaService } from '../../_services';
import {
  IdeaActionTypes,
  IdeaGetAll,
  IdeaGetAllSuccess,
  IdeaGetAllFailure,
  IdeaAdd,
  IdeaAddSuccess,
  IdeaAddFailure,
  IdeaGetOne,
  IdeaGetOneSuccess,
  IdeaGetOneFailure,
  IdeaUpdate,
  IdeaUpdateFailure,
  IdeaUpdateSuccess,
  IdeaDelete,
  IdeaDeleteSuccess,
  IdeaDeleteFailure,
} from '../actions/idea.actions';

@Injectable()
export class IdeaEffects {
  constructor(private actions: Actions, private ideasService: IdeaService) { }

  // Get All Methods
  @Effect()
  IdeaGetAll: Observable<any> = this.actions
    .ofType(IdeaActionTypes.IDEA_GET_ALL)
    .map((action: IdeaGetAll) => action.payload)
    .switchMap(payload => {
      return this.ideasService
        .getAllIdeas(payload)
        .map((user: any) => {
          return new IdeaGetAllSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new IdeaGetAllFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  IdeaGetAllSuccess: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_GET_ALL_SUCCESS),
    tap(_user => { })
  );

  @Effect({ dispatch: false })
  IdeaGetAllFailure: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_GET_ALL_FAILURE)
  );

  // Get One Method
  @Effect()
  IdeaGetOne: Observable<any> = this.actions
    .ofType(IdeaActionTypes.IDEA_GET_ONE)
    .map((action: IdeaGetOne) => action.payload)
    .switchMap(payload => {
      return this.ideasService
        .getOneIdea(payload)
        .map((user: any) => {
          return new IdeaGetOneSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new IdeaGetOneFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  IdeaGetOneSuccess: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_GET_ONE_SUCCESS),
    tap(_user => { })
  );

  @Effect({ dispatch: false })
  IdeaGetOneFailure: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_GET_ONE_FAILURE)
  );

  // Add Method
  @Effect()
  IdeaAdd: Observable<any> = this.actions
    .ofType(IdeaActionTypes.IDEA_ADD)
    .map((action: IdeaAdd) => action.payload)
    .switchMap(payload => {
      return this.ideasService
        .addIdea(payload)
        .map((user: any) => {
          return new IdeaAddSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new IdeaAddFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  IdeaAddSuccess: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_ADD_SUCCESS),
    tap(_user => { })
  );

  @Effect({ dispatch: false })
  IdeaAddFailure: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_ADD_FAILURE)
  );

  // Update Method
  @Effect()
  IdeaUpdate: Observable<any> = this.actions
    .ofType(IdeaActionTypes.IDEA_UPDATE)
    .map((action: IdeaUpdate) => action.payload)
    .switchMap(payload => {
      return this.ideasService
        .updateIdea(payload)
        .map((user: any) => {
          return new IdeaUpdateSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new IdeaUpdateFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  IdeaUpdateSuccess: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_UPDATE_SUCCESS),
    tap(_user => { })
  );

  @Effect({ dispatch: false })
  IdeaUpdateFailure: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_UPDATE_FAILURE)
  );

  @Effect()
  IdeaDelete: Observable<any> = this.actions
    .ofType(IdeaActionTypes.IDEA_DELETE)
    .map((action: IdeaDelete) => action.payload)
    .switchMap(payload => {
      return this.ideasService
        .deleteIdea(payload)
        .map((user: any) => {
          return new IdeaDeleteSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new IdeaDeleteFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  IdeaDeleteSuccess: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_DELETE_SUCCESS),
    tap(_user => { })
  );

  @Effect({ dispatch: false })
  IdeaDeleteFailure: Observable<any> = this.actions.pipe(
    ofType(IdeaActionTypes.IDEA_DELETE_FAILURE)
  );
}
