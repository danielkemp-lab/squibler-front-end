import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegmentService } from 'ngx-segment-analytics'
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable()
export class PaymentService {
  constructor(private apollo: Apollo, private segment: SegmentService) { }

  updateCard(cardData: any) {
    const { card_number, _card_type, cvv, exp_month, exp_year } = cardData;

    return this.apollo
      .mutate({
        mutation: gql`
            mutation addPayment{
              addPayment(cardCvv: ${Number(cvv)}, cardExpMonth: ${Number(exp_month)}, cardExpYear: ${Number(exp_year)}, cardNumber: "${card_number}") {
                ok,
                created,
                error,
                message
              }
            }
          `
      })
      .pipe(map(result => {
        let data = result.data.addPayment
        let userId = localStorage.getItem('userId')

        this.segment.identify(userId, {
          environment: environment.NAME,
          userId: userId,
        });
        let event = data.created ? "Paid account created" : "Payment updated"
        this.segment.track(event, {
          environment: environment.NAME,
          userId: userId,
        });

        return data
      }));
  }

  removeCard() {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation cancelPayment{
              cancelPayment {
                ok,
                error
              }
            }
          `
      })
      .pipe(map(result => {
        let data = result.data.cancelPayment
        let userId = localStorage.getItem('userId')

        this.segment.identify(userId, {
          environment: environment.NAME,
          userId: userId,
        });
        this.segment.track("Subscription canceled", {
          environment: environment.NAME,
          userId: userId,
        });

        return data

      }));
  }
}
