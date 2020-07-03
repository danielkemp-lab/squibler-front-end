import { ResetPasswordPage } from './resetpwd.po';
import { ProjectsPage } from '../../dashboard/projects/projects.po';
import { LoginPage } from '../login/login.po';
import { RegisterPage } from '../register/register.po';
describe('ResetPassword page', () => {
    let resetPasswordPage: ResetPasswordPage;
    let loginPage: LoginPage;
    let registerPage: RegisterPage;

    beforeEach(() => {
        resetPasswordPage = new ResetPasswordPage();
        registerPage = new RegisterPage();
        loginPage = new LoginPage();
    });

    it('when user trying to input with non-email, he should stay on “Forgot Password” page and see error notification', () => {
        resetPasswordPage.navigateTo();
        resetPasswordPage.fillEmail(resetPasswordPage.getDummyString(5));
        expect(resetPasswordPage.getPageTitleText()).toEqual('Forgot Password');
        expect(resetPasswordPage.getErrorMessage()).toEqual('Email is required');
    });

    it('when user inputs email, he should stay on “Forgot Password” page and see confirm notification', () => {
        resetPasswordPage.navigateTo();
        resetPasswordPage.fillEmail('test@mail.com');
        expect(resetPasswordPage.getPageTitleText()).toEqual('Forgot Password');
        expect(resetPasswordPage.getConfirmMessage()).toBeTruthy();
    });

    it('when user clicks “Sign up”, — it should navigate to “Sign Up” page', () => {
        resetPasswordPage.navigateTo();
        resetPasswordPage.navigateToSignUp();
        expect(registerPage.getPageTitleText()).toEqual('Sign Up');
    });

    it('when user clicks “Login”, — it should navigate to “Sign In” page', () => {
        resetPasswordPage.navigateTo();
        resetPasswordPage.navigateToSignIn();
        expect(loginPage.getPageTitleText()).toEqual('Sign In');
    });
});