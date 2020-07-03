import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SegmentService } from 'ngx-segment-analytics'
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable()
export class AuthService {
  constructor(private apollo: Apollo, private http: HttpClient, private segment: SegmentService) { }

  login(payload) {
    const { email, password } = payload;
    return this.apollo
      .mutate({
        mutation: gql`mutation Login {
          login(email: "${email}",
          password: "${password}")
          {
            ok,
            token,
            error,
            user{
              uuid,
              email,
              paymentInfo {
                cardNumber,
                userEmail,
                isActive,
                status,
                expMonth,
                expYear,
                currentPeriodEnd
              },
              createdByGoogle,
              profile {
                  photoUrl,
                name,
              },
            },
          }
        }`
      })
      .pipe(map(result => result.data.login));
  }

  gauth(payload): any {
    const { googleToken, timeSpend, bookType } = payload;

    return this.apollo
      .mutate({
        mutation: gql`
          mutation CreateUser { 
            googleAuth(googleToken: "${googleToken}", timeSpend: "${timeSpend}", bookType:"${bookType}") 
            { 
              ok,
              token,
              user {
                uuid,
                profile {
                  bookType
                }
              },
              error,
              created
            } 
        }`
      })
      .pipe(map(result => result.data.googleAuth));
  }

  fauth(payload): any {
    const { facebookToken, timeSpend, bookType } = payload;

    return this.apollo
      .mutate({
        mutation: gql`
          mutation CreateUser { 
            facebookAuth(facebookToken: "${facebookToken}", timeSpend: "${timeSpend}", bookType:"${bookType}") 
            { 
              ok,
              token,
              user {
                uuid,
                profile {
                  bookType
                }
              },
              error,
              created
            } 
        }`
      })
      .pipe(map(result => result.data.facebookAuth));
  }

  logout() {
    return this.apollo
      .mutate({
        mutation: gql`mutation Logout {
          logout
          {
            ok,
            error
          }
        }`
      })
      .pipe(map(result => {
        this.segment.track("User signed out", {
          environment: environment.NAME,
          userId: localStorage.getItem('userId'),
        });
        localStorage.removeItem('currentUser');

        return result.data.logout
      }));
  }
  signUp(payload) {
    const { email, password, timeSpend, bookType } = payload;

    return this.apollo
      .mutate({
        mutation: gql`
          mutation CreateUser {
            createUser(userCreateInput: { email: "${email}", password: "${password}", timeSpend: "${timeSpend}", bookType:"${bookType}"}) {
              ok,
              token,
              user{
                uuid,
                email,
                paymentInfo {
                  cardNumber,
                  userEmail,
                  isActive,
                  status,
                  expMonth,
                  expYear,
                  currentPeriodEnd
                },
                createdByGoogle,
                profile {
                    photoUrl,
                    timeSpend,
                    bookType,
                  name,
                },
              },
              error,
            }
          }
        `
      })
      .pipe(map(result => result.data.createUser));
  }

  get() {
    return this.http.get(
      `${environment.backUrl}/users/${localStorage.userId}`,
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  resetPassword(payload) {
    const { confirmCode, password, confirmPassword } = payload;
    return this.apollo
      .mutate({
        mutation: gql`
          mutation restorePassword {
            restorePassword(code: "${confirmCode}", newPassword: "${password}") {
              ok,
              error
            }
          }
        `
      })
      .pipe(map(result => result.data.restorePassword))
  }

  forgotPassword(payload) {
    const { email } = payload;
    return this.apollo
      .mutate({
        mutation: gql`mutation forgotPassword { forgotPassword(email: "${email}") { ok, error } }`
      })
      .pipe(map(result => result.data.forgotPassword));
  }

  forgot_password_confirm(user) {
    const { password } = user;
    const confirmCode = user['confirmCode'];
    return this.http.post(
      `${environment.backUrl}/auth/forgot_password_confirmation`,
      {
        code: confirmCode,
        password
      }
    );
  }

  update(user) {
    const {
      name,
      email,
      photo,
      password,
      oldPassword,
      photo_url,
      photo_name
    } = user;
    return this.http.put(
      `${environment.backUrl}/users/${localStorage.userId}${
      photo ? '?image=true' : ''
      }`,
      {
        name,
        photo,
        email,
        old_password: oldPassword,
        password,
        photo_name,
        photo_url
      },
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }
}
