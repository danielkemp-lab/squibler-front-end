import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService, TrialService} from '../../../_services/index';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {DOCUMENT} from '@angular/common';

import {AuthService as SocialService} from 'angularx-social-login';
import {
    PaymentRemoveCard,
    PaymentUpdateCard
} from '../../../store/actions/payment.actions';
import {UploadFile} from '../../../store/actions/upload.actions';
import {
    AppState,
    selectDashboardState,
    selectPaymentState,
    selectUploadState
} from '../../../store/app.states';
import {
    Init,
    UserUpdate
} from '../../../store/actions/dashboard.actions';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {
    title = 'My Account';
    success = false;
    profileForm: FormGroup;
    cardForm: FormGroup;
    cartInfo: FormGroup;
    loading = false;
    submited = false;
    unsubscribeMessage = false;
    cardSubmited = false;
    edit = false;
    user = undefined;
    status = 'inactive';
    cardError = '';
    cartStars = '**** **** **** ';
    subMessage = '';
    profileErrorMsg = '';
    profileError = false;
    updated = false;
    loggedIn = false;
    cardInfoShow = false;
    avatarUploading = false;
    paymentUpdated = false;
    paymentMessage = '';
    paymentError = '';
    paymentLoading = false;
    avatarError = false;
    userUpdated = false;
    updateFunction = false;
    showBillingHistory = false;
    expDays: number;
    expDate: number;
    showCancelSubPopup = false;
    paymentLoader = true;
    showPaymentForm = false;
    showCancelLoader = false;
    showProjectInfo = true;
    paymentStatus: any;
    userPhotoUrl;
    dashboardSubscription: Subscription;
    getDashboardState: Observable<any>;
    getPaymentState: Observable<any>;
    getUploadState: Observable<any>;
    errorMessage: string | null;
    messageExpCont = 'will end';
    @ViewChild('cardDateVar') el: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private formBuilder: FormBuilder,
        private router: Router,
        private store: Store<AppState>,
        private socialService: SocialService,
        private authService: AuthService,
        private trialService: TrialService
    ) {
        this.getPaymentState = this.store.select(selectPaymentState);
        this.getUploadState = this.store.select(selectUploadState);
        this.getDashboardState = this.store.select(selectDashboardState);
    }

    ngOnInit(): void {
        this.trialService.openTrialSet(false);
        this.store.dispatch(new Init({}));
        this.paymentStatus = localStorage.paymentStatus;
        let changeComponent = true;
        this.profileForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', []],
            oldPassword: ['', []],
            photo_url: ['', []]
        });
        this.cardForm = this.formBuilder.group({
            cardNumber: ['', [Validators.required]],
            cardDate: ['', [Validators.required]],
            cardCvc: ['', [Validators.required]]
        });
        this.cartInfo = this.formBuilder.group({
            cardNumber: ['', [Validators.required]]
        });
        this.socialService.authState.subscribe(user => {
            this.loggedIn = (user !== undefined);
        });
        this.dashboardSubscription = this.getDashboardState.subscribe(state => {
            this.loading = false;
            if (state.user && state.user.token) {
                localStorage.token = state.user.token;
            }
            this.errorMessage = state.error;
            if (state.user) {
                this.paymentLoader = false;
                if (state.user.profile.photoUrl) {
                    this.userPhotoUrl = state.user.profile.photoUrl;
                }
                if (state.user.paymentInfo.status) {
                    this.status = state.user.paymentInfo.status;
                    let dateExp = state.user.paymentInfo.currentPeriodEnd;
                    const dateNow = new Date();
                    dateExp = new Date(1000 * dateExp);
                    const timeDiff = Math.abs(dateExp.getTime() - dateNow.getTime());
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    this.expDate = dateExp;
                    this.expDays = diffDays;
                    if (localStorage.paymentStatus === 'active') {
                        if (localStorage.lastNumber) {
                            this.cartInfo.get('cardNumber').setValue(this.cartStars + localStorage.lastNumber);
                        }
                        state.user.paymentInfo.status = 'active';
                    }
                    if (state.user.paymentInfo.status !== 'trial') {
                        this.showPaymentForm = true;
                    }
                    this.status = state.user.paymentInfo.status;
                    if (state.user.paymentInfo.status === 'active' && dateExp > dateNow && state.user.paymentInfo.cardNumber === null) {
                        this.status = 'unsubscribe';
                    }
                    if (state.user.paymentInfo.status === 'inactive' && dateNow > dateExp) {
                        this.messageExpCont = 'has ended';
                    }
                }
                if (state.user.paymentInfo.cardNumber) {
                    this.status = 'active';
                    this.cartInfo.controls['cardNumber'].setValue(this.cartStars + state.user.paymentInfo.cardNumber, {onlySelf: true});
                }
                this.user = state.user;
                this.profileForm = this.formBuilder.group({
                    name: [state.user.profile.name, []],
                    email: [
                        state.user.email,
                        [
                            Validators.required,
                            Validators.email,
                            Validators.pattern(
                                /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                            )
                        ]
                    ],
                    password: ['', []],
                    oldPassword: ['', []],
                    photo_url: [state.user.profile.photoUrl, []]
                });

            }

            if (this.userUpdated && state.user && !state.error && state.userUpdated) {
                this.profileForm.get('password').setValue('');
                this.profileForm.get('oldPassword').setValue('');
                this.updated = true;
                setTimeout(() => {
                    this.updated = false;
                    this.userUpdated = false;
                }, 2000);
            }
            if (this.userUpdated && state.error) {
                this.profileErrorMsg = state.error;
                this.profileError = true;
                this.updated = true;
                this.subMessage = 'You successfully unsubscribe';
                setTimeout(() => {
                    this.updated = false;
                    this.profileError = false;
                    this.userUpdated = false;
                }, 2000);
            }
            state = undefined;
        });

        this.getPaymentState.subscribe(state => {
            this.trialService.openTrialSet(false);
            this.paymentError = state.message;
            this.cardSubmited = false;
            this.paymentLoading = false;
            this.paymentUpdated = true;
            if (state.message === '' && state.status === true) {
                this.unsubscribeMessage = true;
                this.subMessage = 'Thank you! You successfully subscribe ';
                let lastNumbers = localStorage.lastNumber ? localStorage.lastNumber : '';
                if (this.cardForm.value.cardNumber) {
                    lastNumbers = this.cardForm.value.cardNumber.slice(-4);
                    localStorage.lastNumber = lastNumbers;
                    localStorage.succSub = true;
                }
                if (changeComponent !== true || this.cardInfoShow === true) {
                    setTimeout(() => {
                        this.cardInfoShow = false;
                        this.cartInfo.get('cardNumber').setValue(this.cartStars + lastNumbers);
                        this.status = 'active';
                        this.unsubscribeMessage = false;
                        this.cardForm.reset();
                    }, 2000);
                }
                if (changeComponent === true && !this.cardInfoShow) {
                    changeComponent = false;
                    this.cartInfo.get('cardNumber').setValue(this.cartStars + lastNumbers);
                    this.status = 'active';
                    this.unsubscribeMessage = false;
                    this.cardForm.reset();
                }
            }
            if (state.message === undefined && state.status === true) {
                this.unsubscribeMessage = true;
                this.subMessage = 'You successfully unsubscribe';
                if (changeComponent !== true) {
                    setTimeout(() => {
                        this.unsubscribeMessage = false;
                        this.paymentLoading = true;
                        this.showProjectInfo = true;
                        this.showCancelLoader = false;
                        this.showCancelSubPopup = false;
                        this.paymentLoading = false;
                        this.status = 'unsubscribe';
                    }, 2000);
                }
                if (changeComponent === true) {
                    this.unsubscribeMessage = false;
                    this.paymentLoading = true;
                    this.showProjectInfo = true;
                    this.showCancelLoader = false;
                    this.showCancelSubPopup = false;
                    this.paymentLoading = false;
                    this.status = 'unsubscribe';
                }
            }
            if (state.status === true)
                localStorage.paymentStatus = 'active';

            setTimeout(() => {
                this.paymentUpdated = false;
            }, 2000);
        });
        this.getUploadState.subscribe(state => {
            this.avatarUploading = false;
            if (state.photoUrl) {
                this.profileForm.get('photo_url')
                    .setValue(state.photoUrl);
                this.profileForm.markAsTouched();
                this.onSubmit();
            }
        });
        this.cardForm.get('cardDate').valueChanges
            .subscribe(val => {
                this.maskCardDate(this.el.nativeElement);
            });
    }

    openPolicy(value): void {
        if (value === 'service')
            window.open('https://www.squibler.io/terms-of-service', '_blank');
        else
            window.open('https://www.iubenda.com/privacy-policy/69329368/cookie-policy', '_blank');
    }

    ngOnDestroy(): void {
        this.dashboardSubscription.unsubscribe();
    }

    changeView(): void {
        this.edit = true;
    }

    showInfo(): void {
        this.showProjectInfo = !this.showProjectInfo;
        this.cardInfoShow = false;
    }

    logOut(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('paymentStatus');
        if (this.loggedIn) this.socialService.signOut();
        window.location.href = '/auth/login';
    }

    get profileFormState(): any {
        return this.profileForm.controls;
    }

    maskCardNumber(e): void {
        e.target.value = e.target.value
            .replace(/\W/gi, '')
            .replace(
                /[^\d\/]|^[\/]{0,}$/g,
                '' // To allow only numbers and /
            )
            .replace(/(.{4})/g, '$1 ');
    }

    maskCardCvc(e): any {
        if (!(e.charCode > 47 && e.charCode < 58)) {
            return false;
        }
    }

    maskCardDate(e): any {
        if (e.value) {
            e.value = e.value
                .replace(
                    /^([1-9]\/|[2-9])$/g,
                    '0$1/' // 3/ > 03/
                )
                .replace(
                    /^(0[1-9]{1}|1[0-2]{1})$/g,
                    '$1/' // 11 > 11/
                )
                .replace(
                    /^([0-1]{1})([3-9]{1})$/g,
                    '0$1/$2' // 13 > 01/3
                )
                .replace(
                    /^(\d)\/(\d\d\d\d)$/g,
                    '0$1/$2' // 1/11 > 01/11
                )
                .replace(
                    /^(0?[1-9]{1}|1[0-2]{1})([0-9]{4})$/g,
                    '$1/$2' // 141 > 01/41
                )
                .replace(/[^\d\/]|^[\/]{0,}$/g, '')
                .replace(/\/\//g, '/');
        }
    }

    get cardFormState(): any {
        return this.cardForm.controls;
    }

    onSubmit(): any {
        this.userUpdated = true;
        this.submited = true;
        if (this.profileForm.invalid) return;
        this.store.dispatch(new UserUpdate(this.profileForm.value));
        this.loading = true;
        this.profileForm.markAsUntouched();
    }

    isValid(cardForm): any {
        const year = cardForm.value.cardDate.substring(3, 7);
        const month = cardForm.value.cardDate.substring(0, 2);
        if (moment(`${year}-${month}-${moment().day()}`).isBefore(moment())) {
            this.cardError = 'Your card is expired!';

            return false;
        }
        this.cardError = '';

        return true;
    }

    GetCardType(cardNumber): any {
        // visa
        let re = new RegExp('^4');
        if (cardNumber.match(re) !== undefined) {
            return 'Visa';
        }
        if (
            /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
                cardNumber
            )
        )
            return 'Mastercard';

        re = new RegExp('^3[47]');
        if (cardNumber.match(re) !== undefined) return 'AMEX';

        re = new RegExp(
            '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)'
        );
        if (cardNumber.match(re) !== undefined) return 'Discover';

        re = new RegExp('^36');
        if (cardNumber.match(re) !== undefined) return 'Diners';

        re = new RegExp('^30[0-5]');
        if (cardNumber.match(re) !== undefined) return 'Diners - Carte Blanche';

        re = new RegExp('^35(2[89]|[3-8][0-9])');
        if (cardNumber.match(re) !== undefined) return 'JCB';

        re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
        if (cardNumber.match(re) !== undefined) return 'Visa Electron';

        return '';
    }

    onPaymentSubmit(): any {
        this.cardSubmited = true;
        if (this.cardForm.invalid) return;

        if (this.isValid(this.cardForm)) {
            this.paymentLoading = true;
            const cardData = {
                card_number: this.cardForm.value.cardNumber.replace(/\s/g, ''),
                exp_year: parseInt(this.cardForm.value.cardDate.substring(3, 7), 10),
                exp_month: parseInt(this.cardForm.value.cardDate.substring(0, 2), 10),
                cvv: this.cardForm.value.cardCvc,
                card_type: this.GetCardType(
                    this.cardForm.value.cardNumber.replace(/\s/g, '')
                )
            };
            this.store.dispatch(new PaymentUpdateCard(cardData));
            this.cardSubmited = false;
        }
    }

    udpateCardFunction(): void {
        this.updateFunction = true;
    }

    changeSubscription(): void {
        this.cardInfoShow = !this.cardInfoShow;
    }

    cancelSubscription(): void {
        this.showCancelLoader = true;
        this.store.dispatch(new PaymentRemoveCard({}));
    }

    onAvatarSelect(event): void {
        if (event.target.files[0].size <= 10485760) {
            this.avatarUploading = true;
            const reader = new FileReader();
            reader.onloadend = () => {
                this.store.dispatch(new UploadFile(reader.result));
            };
            reader.readAsDataURL(event.target.files[0]);
        } else this.avatarError = true;
    }
}
