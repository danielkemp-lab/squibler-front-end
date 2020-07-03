import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ForgotPassword,
  ResetPassword
} from '../../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../../store/app.states';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss'],
})
export class ResetpwdComponent implements OnInit {
  public forgetPasswordForm: FormGroup;
  public confirmCodeForm: FormGroup;
  public loading = false;
  public submitted = false;
  public submittedView = false;
  public resetPasswordForm = false;
  public confirmCodeError: string;
  confirmCodeSuccess: string;
  sendEmailError: string;
  getState: Observable<any>;
  errorMessage: string | null;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  get resetPasswordFormState() {
    return this.forgetPasswordForm.controls;
  }
  get confirmCodeFormState() {
    return this.confirmCodeForm.controls;
  }

  sendEmailAgain() {
    this.submittedView = false;
  }
  onSubmit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new ForgotPassword(this.forgetPasswordForm.value));
  }

  sentCode() {
    const value = this.confirmCodeForm.value;
    this.submitted = true;
    if (this.confirmCodeForm.invalid) {
      return;
    }
    if (value.password !== value.confirmPassword) {
      this.confirmCodeError = 'password do not match';
      return;
    }
    this.store.dispatch(
      new ResetPassword(value)
    );
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.sendEmailError = state.errorMessage;
      this.loading = false;
      if (state.isValidEmail) {
        this.submittedView = true;
        this.confirmCodeSuccess =
          'Reset email has been sent!';
      }
      if (!state.isValidCode) {
        this.confirmCodeError = state.errorMessage;
      }
      if (state.isValidCode) {
        this.confirmCodeError = null;
        this.confirmCodeSuccess =
          'Your password has been successfully updated! You will be automatically redirected to login page in 5 seconds!';
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 5000);
      }
    });

    const url = new URL(location.href);
    const emailParam = url.searchParams.get('confirm_code');
    if (emailParam) {
      this.resetPasswordForm = true;
      this.confirmCodeForm = this.formBuilder.group({
        confirmCode: [emailParam, [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      });
    }
    this.forgetPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ]
      ]
    });
  }
}
