import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../../store/app.states';
import {Gauth, SignUp, Fauth} from '../../../store/actions/auth.actions';
import {Observable} from 'rxjs/Observable';
import {SegmentService} from 'ngx-segment-analytics';
import {environment} from '../../../../environments/environment';

@Component({
    selector: "app-footer-boarding",
    templateUrl: "./boarding.footer.component.html",
    styleUrls: ["./boarding.footer.component.scss"]
})
export class BoardingFooterComponent implements OnInit {
    started = false;
    visible = true;
    gauth = false;
    fauth = false;
    time = '';
    book = '';
    registerForm: FormGroup;
    slide = 0;
    getState: Observable<any>;
    submited = false;
    registerError = '';
    loading: boolean = false;
    @Input() footer: boolean = false;
    @Output()
    onStart = new EventEmitter();
    registerState = {};

    constructor(
        private formBuilder: FormBuilder,
        private googleAuthService: AuthService,
        private facebookAuthService: AuthService,
        private store: Store<AppState>,
        private segment: SegmentService
    ) {
        this.getState = this.store.select(selectAuthState);

    }

    ngOnInit() {

        this.registerState = {
            0: {
                func: (_a) => {
                },
                args: null
            },
            1: {
                func: () => {
                    this.segment.track(`Home Start Page Writing ${this.footer ? "Bottom" : "Top"}`, {
                        environment: environment.NAME,
                        userId: localStorage.getItem('userId'),
                    });
                },
                args: null,
            },
            2: {
                func: () => {
                    this.segment.track(`Daily Goal ${this.time}`, {
                        environment: environment.NAME,
                        userId: localStorage.getItem('userId'),
                    });
                },
                args: null,
            },
            3: {
                func: () => {
                    this.segment.track(`Chose ${this.book}`, {
                        environment: environment.NAME,
                        userId: localStorage.getItem('userId'),
                    });
                },
                args: null,
            },
        };

        this.registerForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                ]
            ],
            password: ['', [Validators.required]]
        });
        this.getState.subscribe(state => {
            this.registerError = '';
            if (state.signupsuccess) {
                this.loading = false
            } 
            if (state.errorMessage) {
                this.registerError = state.errorMessage;
                this.loading = false
            }

        });
        this.googleAuthService.authState.subscribe(user => {
            if (user && this.gauth) {
                const payload = {
                    googleToken: user.idToken,
                    timeSpend: this.time,
                    bookType: this.book
                };
                this.store.dispatch(new Gauth(payload));
            }
        });

        this.facebookAuthService.authState.subscribe(user => {
            if (user && this.fauth) {
                const payload = {
                    facebookToken: user.authToken,
                    timeSpend: this.time,
                    bookType: this.book
                };
                this.store.dispatch(new Fauth(payload));
            }
        });

    }

    start() {
        this.onStart.emit();
        this.started = true;
        this.visible = false;
        setTimeout(function () {
            let slideState = this.registerState[++this.slide];
            slideState.func();
        }.bind(this), 300);
        setTimeout(function () {
            this.visible = true;
        }.bind(this), 600);
    }

    next() {
        this.visible = false;
        setTimeout(function () {
            let slideState = this.registerState[++this.slide];
            slideState.func();
        }.bind(this), 300);
        setTimeout(function () {
            this.visible = true;
        }.bind(this), 600);
    }

    signInWithGoogle() {
        this.gauth = true;
        this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFacebook() {
        this.fauth = true;
        this.facebookAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    get registerFormState() {
        return this.registerForm.controls;
    }

    formSubmit() {
        this.submited = true;
        if (this.registerForm.invalid) {
            return;
        }
        const data = {
            ...this.registerForm.value,
            timeSpend: this.time,
            bookType: this.book
        }
        this.loading = true
        this.store.dispatch(new SignUp(data));
    }
}
