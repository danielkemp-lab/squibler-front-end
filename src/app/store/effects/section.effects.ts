import { forwardRef, Injectable, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { SectionService } from '../../_services';
import {
  SectionActionTypes,
  SectionGetAll,
  SectionGetAllSuccess,
  SectionGetAllFailure,
  SectionAdd,
  SectionAddSuccess,
  SectionAddFailure,
  SectionGetOne,
  SectionGetOneSuccess,
  SectionGetOneFailure,
  SectionUpdate,
  SectionUpdateFailure,
  SectionUpdateSuccess,
  SectionDelete,
  SectionDeleteSuccess,
  SectionDeleteFailure,
} from '../actions/section.actions';

@NgModule({ providers: [forwardRef(() => SectionEffects)] })
@Injectable()
export class SectionEffects {
  constructor(
    private actions: Actions,
    private sectionService: SectionService
  ) { }

  // Get All Methods
  @Effect()
  SectionGetAll: Observable<any> = this.actions
    .ofType(SectionActionTypes.SECTION_GET_ALL)
    .map((action: SectionGetAll) => action.payload)
    .switchMap(payload => {
      return this.sectionService
        .getAllSections(payload)
        .map((user: any) => {
          return new SectionGetAllSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SectionGetAllFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SectionGetAllSuccess: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_GET_ALL_SUCCESS),
    tap(() => { })
  );

  @Effect({ dispatch: false })
  SectionGetAllFailure: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_GET_ALL_FAILURE)
  );

  @Effect()
  SectionGetOne: Observable<any> = this.actions
    .ofType(SectionActionTypes.SECTION_GET_ONE)
    .map((action: SectionGetOne) => action.payload)
    .switchMap(payload => {
      return this.sectionService
        .getOneSection(payload)
        .map((user: any) => {
          return new SectionGetOneSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SectionGetOneFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SectionGetOneSuccess: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_GET_ONE_SUCCESS),
    tap(() => { })
  );

  @Effect({ dispatch: false })
  SectionGetOneFailure: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_GET_ONE_FAILURE)
  );

  // Add Method
  @Effect()
  SectionAdd: Observable<any> = this.actions
    .ofType(SectionActionTypes.SECTION_ADD)
    .map((action: SectionAdd) => action.payload)
    .switchMap(payload => {
      return this.sectionService
        .addSection(payload)
        .map((user: any) => {
          return new SectionAddSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SectionAddFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SectionAddSuccess: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_ADD_SUCCESS),
    tap(() => { })
  );

  @Effect({ dispatch: false })
  SectionAddFailure: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_ADD_FAILURE)
  );

  // Update Method
  @Effect()
  SectionUpdate: Observable<any> = this.actions
    .ofType(SectionActionTypes.SECTION_UPDATE)
    .map((action: SectionUpdate) => action.payload)
    .switchMap(payload => {
      return this.sectionService
        .updateSection(payload)
        .map((user: any) => {
          return new SectionUpdateSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SectionUpdateFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SectionUpdateSuccess: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_UPDATE_SUCCESS),
    tap(() => { })
  );

  @Effect({ dispatch: false })
  SectionUpdateFailure: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_UPDATE_FAILURE)
  );

  @Effect()
  SectionDelete: Observable<any> = this.actions
    .ofType(SectionActionTypes.SECTION_DELETE)
    .map((action: SectionDelete) => action.payload)
    .switchMap(payload => {
      return this.sectionService
        .deleteSection(payload)
        .map((user: any) => {
          return new SectionDeleteSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SectionDeleteFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SectionDeleteSuccess: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_DELETE_SUCCESS),
    tap(() => { })
  );

  @Effect({ dispatch: false })
  SectionDeleteFailure: Observable<any> = this.actions.pipe(
    ofType(SectionActionTypes.SECTION_DELETE_FAILURE)
  );
}
