import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { SettingsService } from '../../_services';

import {
    Init,
    InitFailure,
    InitSuccess,
    SettingsActionTypes,
    UpdateUser,
    UpdateUserFailure,
    UpdateUserSuccess

} from '../actions/settings.actions';

@Injectable()
export class SettingsEffects {


    @Effect({ dispatch: false })
    InitSuccess: Observable<any> = this.actions.pipe(
        ofType(SettingsActionTypes.INIT_SUCCESS)
    );

    @Effect({ dispatch: false })
    InitFailure: Observable<any> = this.actions.pipe(
        ofType(SettingsActionTypes.INIT_FAILURE)
    );

    @Effect()
    UpdateUser: Observable<any> = this.actions
        .ofType(SettingsActionTypes.UPDATE_USER)
        .map((action: UpdateUser) => action.payload)
        .switchMap(payload => {
            return this.settingsService.updateUser(payload)
                .map(data => {
                    if (data.ok) return new UpdateUserSuccess({ user: data.user });
                    else return Observable.of(new UpdateUserFailure({ error: data.error }));
                });
        });

    @Effect({ dispatch: false })
    UpdateUserSuccess: Observable<any> = this.actions.pipe(
        ofType(SettingsActionTypes.UPDATE_USER_SUCCESS)
    );
    @Effect({ dispatch: false })
    UpdateUserFailure: Observable<any> = this.actions.pipe(
        ofType(SettingsActionTypes.UPDATE_USER_FAILURE)
    );

    constructor(
        private actions: Actions,
        private settingsService: SettingsService
    ) { }

}
