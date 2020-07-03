import { Injectable, forwardRef, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { UploadService } from '../../_services';
import {
  UploadActionTypes,
  UploadFile,
  UploadFileSuccess,
  UploadFileFailure,
} from '../actions/upload.actions';

@NgModule({ providers: [forwardRef(() => UploadEffects)] })
@Injectable()
export class UploadEffects {
  constructor(private actions: Actions, private uploadService: UploadService) {}

  @Effect()
  UploadFile: Observable<any> = this.actions
    .pipe(ofType(UploadActionTypes.UPLOAD_FILE))
    .map((action: UploadFile) => action.payload)
    .switchMap(payload => {
      return this.uploadService
        .upload(payload)
        .map(payload => {
          return new UploadFileSuccess(payload);
        })
        .catch(() => {
          return Observable.of(new UploadFileFailure({}));
        });
    });
}
