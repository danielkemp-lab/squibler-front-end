import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { SegmentService } from 'ngx-segment-analytics'
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsService {
    constructor(private apollo: Apollo, private segment: SegmentService) { }

    updateUser(payload): any {
        const { email, name, oldPassword, password } = payload;

        return this.apollo
            .mutate({
                mutation: gql`
                     mutation UpdateUser {
                         updateUser( userUpdateInput: {
                                email: "${email}"
                               ${name ? `,name: "${name}"` : ''}
                               ${password && oldPassword ? `,password: "${password}"` : ''}
                               ${password && oldPassword ? `,oldPassword: "${oldPassword}"` : ''}
                               }
                            ) {
                                user{
                                    uuid,
                                    email,
                                    paymentInfo {
                                        cardNumber,
                                        userEmail,
                                        isActive,
                                        status,
                                    },
                                    createdByGoogle,
                                    profile {
                                        photoUrl,
                                        name,
                                    },
                                },
                                token,
                                ok,
                                error
                            }
                        }`
            })
            .pipe(map(result => {
                let data = result.data.updateUser
        
                this.segment.identify(data.user.uuid, {
                  environment: environment.NAME,
                  userId: data.user.uuid,
                });
                this.segment.track("User updated", {
                  environment: environment.NAME,
                  userId: data.user.uuid,
                });
        
                return data
              }));
    }
}
