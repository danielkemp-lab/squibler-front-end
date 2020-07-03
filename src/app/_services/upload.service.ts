import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { SegmentService } from 'ngx-segment-analytics'
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
@Injectable()
export class UploadService {
  constructor(private apollo: Apollo, private segment: SegmentService) { }

  public upload(base64: String) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation UpdateUser($file: Upload!) {
              updateUser( userUpdateInput: {file: $file} ) {
                user{
                  uuid,
                  email,
                  profile {
                    photoUrl,
                    name,
                    photo,
                  },
                },
                ok,
                error
              }
            }`,
        variables: {
          file: base64
        }
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
