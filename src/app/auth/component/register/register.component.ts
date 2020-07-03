import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Store
} from '@ngrx/store';
import {
  Observable
} from 'rxjs/Observable';
import {
  AppState,
  selectAuthState
} from '../../../store/app.states';
import {
  SignUp
} from '../../../store/actions/auth.actions';
import { SegmentService } from 'ngx-segment-analytics';
import { Gauth, LogIn, Fauth } from '../../../store/actions/auth.actions';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  gauth: boolean;
  fauth: boolean = false;
  registerError: string;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private segment: SegmentService,
	private facebookAuthService: AuthService,
	private googleAuthService: AuthService
  ) {
    this.getState = this.store.select(selectAuthState);
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

    this.getState.subscribe(state => {
      if (state.errorMessage) {
		this.googleAuthService.signOut();
        this.registerError = state.errorMessage;
        this.loading = false;
      }
      if (state.user) {
        this.loading = false;
      }
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required]]
    });
  }
  get registerFormState() {
    return this.registerForm.controls;
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
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new SignUp(this.registerForm.value));
  }

  redirect(value): void {
    window.open(value, '_blank');
  }
}
