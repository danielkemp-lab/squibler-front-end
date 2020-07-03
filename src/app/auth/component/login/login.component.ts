import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../store/app.states';
import { Gauth, LogIn, Fauth } from '../../../store/actions/auth.actions';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  gauth: boolean;
  fauth: boolean = false;
  loginError: boolean;
  getAuthState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private facebookAuthService: AuthService,
    private store: Store<AppState>,
    private googleAuthService: AuthService
  ) {
    this.getAuthState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.gauth = false;
    this.googleAuthService.authState.subscribe(user => {
      if (user && this.gauth) {
        const payload = {
          googleToken: user.idToken,
          timeSpend: 10,
          bookType: 'fiction'
        };
        this.store.dispatch(new Gauth(payload));
      }
    });

    this.facebookAuthService.authState.subscribe(user => {
      if (user && this.fauth) {
        const payload = {
          facebookToken: user.authToken,
          timeSpend: 10,
          bookType: 'fiction'
        };
        this.store.dispatch(new Fauth(payload));
      }
    });

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ],
      password: ['', Validators.required]
    });
    this.getAuthState.subscribe(state => {
      if (state.errorMessage) {
        this.googleAuthService.signOut();
        this.loginError = state.errorMessage;
        this.loading = false;
      }
      if (state.user) {
        this.loginError = false;
        this.loading = false;
      }
    });
  }

  get loginFormState() {
    return this.loginForm.controls;
  }
  signInWithGoogle() {

    this.gauth = true;
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook() {
    this.fauth = true;
    this.facebookAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loading = false
      return 'invalid form';
    }
    const payload = {
      email: this.loginFormState.email.value,
      password: this.loginFormState.password.value
    };

    this.store.dispatch(new LogIn(payload));
  }
}
