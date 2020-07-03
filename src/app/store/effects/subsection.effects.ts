import { Injectable, forwardRef, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { SubsectionService } from '../../_services';
import {
  SubSectionActionTypes,
  SubSectionGetAll,
  SubSectionGetAllSuccess,
  SubSectionGetAllFailure,
  SubSectionAdd,
  SubSectionAddSuccess,
  SubSectionAddFailure,
  SubSectionGetOne,
  SubSectionGetOneSuccess,
  SubSectionGetOneFailure,
  SubSectionUpdate,
  SubSectionUpdateFailure,
  SubSectionUpdateSuccess,
  SubSectionDelete,
  SubSectionDeleteSuccess,
  SubSectionDeleteFailure,
} from '../actions/subsection.actions';

@NgModule({ providers: [forwardRef(() => SubSectionEffects)] })
@Injectable()
export class SubSectionEffects {
  constructor(private actions: Actions, private subsectionService: SubsectionService) {}

  @Effect()
  SubSectionGetAll: Observable<any> = this.actions
    .ofType(SubSectionActionTypes.SUBSECTION_GET_ALL)
    .map((action: SubSectionGetAll) => action.payload)
    .switchMap(payload => {
      return this.subsectionService
        .getAllSubSections(payload)
        .map((user: any) => {
          return new SubSectionGetAllSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SubSectionGetAllFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SubSectionGetAllSuccess: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_GET_ALL_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  SubSectionGetAllFailure: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_GET_ALL_FAILURE)
  );

  @Effect()
  SubSectionGetOne: Observable<any> = this.actions
    .ofType(SubSectionActionTypes.SUBSECTION_GET_ONE)
    .map((action: SubSectionGetOne) => action.payload)
    .switchMap(payload => {
      return this.subsectionService
        .getOneSubSection(payload)
        .map((user: any) => {
          return new SubSectionGetOneSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SubSectionGetOneFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SubSectionGetOneSuccess: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_GET_ONE_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  SubSectionGetOneFailure: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_GET_ONE_FAILURE)
  );

  // Add Method
  @Effect()
  SubSectionAdd: Observable<any> = this.actions
    .ofType(SubSectionActionTypes.SUBSECTION_ADD)
    .map((action: SubSectionAdd) => action.payload)
    .switchMap(payload => {
      return this.subsectionService
        .addSubSection(payload)
        .map((user: any) => {
          return new SubSectionAddSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SubSectionAddFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SubSectionAddSuccess: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_ADD_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  SubSectionAddFailure: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_ADD_FAILURE)
  );

  // Update Method
  @Effect()
  SubSectionUpdate: Observable<any> = this.actions
    .ofType(SubSectionActionTypes.SUBSECTION_UPDATE)
    .map((action: SubSectionUpdate) => action.payload)
    .switchMap(payload => {
      return this.subsectionService
        .updateSubSection(payload)
        .map((user: any) => {
          return new SubSectionUpdateSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SubSectionUpdateFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SubSectionUpdateSuccess: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_UPDATE_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  SubSectionUpdateFailure: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_UPDATE_FAILURE)
  );

  @Effect()
  SubSectionDelete: Observable<any> = this.actions
    .ofType(SubSectionActionTypes.SUBSECTION_DELETE)
    .map((action: SubSectionDelete) => action.payload)
    .switchMap(payload => {
      return this.subsectionService
        .deleteSubSection(payload)
        .map((user: any) => {
          return new SubSectionDeleteSuccess({ user });
        })
        .catch(error => {
          return Observable.of(new SubSectionDeleteFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SubSectionDeleteSuccess: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_DELETE_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  SubSectionDeleteFailure: Observable<any> = this.actions.pipe(
    ofType(SubSectionActionTypes.SUBSECTION_DELETE_FAILURE)
  );
}
