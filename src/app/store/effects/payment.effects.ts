import { forwardRef, Injectable, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { PaymentService } from '../../_services';
import {
  PaymentActionTypes,
  PaymentRemoveCard,
  PaymentRemoveCardFailure,
  PaymentRemoveCardSuccess,
  PaymentUpdateCard,
  PaymentUpdateCardFailure,
  PaymentUpdateCardSuccess
} from '../actions/payment.actions';

@Injectable()
export class PaymentEffects {

  @Effect()
  PaymentUpdateCard: Observable<any> = this.actions
    .pipe(ofType(PaymentActionTypes.PAYMENT_UPDATE_CARD))
    .map((action: PaymentUpdateCard) => action.payload)
    .switchMap(payload => {
      return this.paymentService
        .updateCard(payload)
        .map(_payload => {
          if (_payload.ok === true)
            localStorage.paymentStatus = 'active';

          return new PaymentUpdateCardSuccess(_payload);
        })
        .catch(error => {
          return Observable.of(new PaymentUpdateCardFailure(error));
        });
    });
  @Effect()
  PaymentRemoveCard: Observable<any> = this.actions
    .pipe(ofType(PaymentActionTypes.PAYMENT_REMOVE_CARD))
    .map((action: PaymentRemoveCard) => action.payload)
    .switchMap(() => {
      return this.paymentService
        .removeCard()
        .map(payload => {
          return new PaymentRemoveCardSuccess(payload);
        })
        .catch(error => {
          return Observable.of(new PaymentRemoveCardFailure(error));
        });
    });
  constructor(
    private actions: Actions,
    private paymentService: PaymentService
  ) { }
}
