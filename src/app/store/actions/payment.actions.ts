import { Action } from '@ngrx/store';

export enum PaymentActionTypes {
  PAYMENT_UPDATE_CARD = '[Payment] Payment card updating!',
  PAYMENT_UPDATE_CARD_SUCCESS = '[Payment] Payment card updated!',
  PAYMENT_UPDATE_CARD_FAILURE = '[Payment] Payment card update error!',
  PAYMENT_REMOVE_CARD = '[Payment] Payment remove card',
  PAYMENT_REMOVE_CARD_SUCCESS = '[Payment] Payment card removed!',
  PAYMENT_REMOVE_CARD_FAILURE = '[Payment] Payment card remove error!',
}

export class PaymentUpdateCard implements Action {
  readonly type = PaymentActionTypes.PAYMENT_UPDATE_CARD;
  constructor(public payload: any) {}
}

export class PaymentUpdateCardSuccess implements Action {
  readonly type = PaymentActionTypes.PAYMENT_UPDATE_CARD_SUCCESS;
  constructor(public payload: any) {}
}
export class PaymentUpdateCardFailure implements Action {
  readonly type = PaymentActionTypes.PAYMENT_UPDATE_CARD_FAILURE;
  constructor(public payload: any) {}
}
export class PaymentRemoveCard implements Action {
  readonly type = PaymentActionTypes.PAYMENT_REMOVE_CARD;
  constructor(public payload: any) {}
}
export class PaymentRemoveCardSuccess implements Action {
  readonly type = PaymentActionTypes.PAYMENT_REMOVE_CARD_SUCCESS;
  constructor(public payload: any) {}
}
export class PaymentRemoveCardFailure implements Action {
  readonly type = PaymentActionTypes.PAYMENT_REMOVE_CARD_FAILURE;
  constructor(public payload: any) {}
}
export type All =
  | PaymentUpdateCard
  | PaymentRemoveCard
  | PaymentUpdateCardSuccess
  | PaymentUpdateCardFailure
  | PaymentRemoveCardSuccess
  | PaymentRemoveCardFailure;
