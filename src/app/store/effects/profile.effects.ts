import { Injectable, forwardRef, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { AuthService } from '../../_services';
import {
  ProfileActionTypes,
  ProfileEdit,
  ProfileEditSuccess,
  ProfileEditFailure,
} from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions: Actions, private authService: AuthService) { }

  // @Effect()
  // ProfileEdit: Observable<any> = this.actions
  //   .ofType(ProfileActionTypes.PROFILE_EDIT)
  //   .map((action: ProfileEdit) => action.payload)
  //   .switchMap(payload => {
  //     return this.authService
  //       .update(payload)
  //       .map((user: any) => {
  //         return new ProfileEditSuccess({ user });
  //       })
  //       .catch(error => {
  //         return Observable.of(new ProfileEditFailure(error));
  //       });
  //   });
}
