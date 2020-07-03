import { LoginPage } from './login.po';
import { ProjectsPage } from '../../dashboard/projects/projects.po';
import { RegisterPage } from '../register/register.po';
import { ResetPasswordPage } from '../resetpwd/resetpwd.po';

describe('Login page', () => {
    let loginPage: LoginPage;
    let projectsPage: ProjectsPage;
    let registerPage: RegisterPage;
    let resetPasswordPage: ResetPasswordPage;
    const wrongCredentias = {
        email: 'wrong@email.com',
        password: 'wrongpasswd'
    };

    beforeEach(() => {
        loginPage = new LoginPage();
        projectsPage = new ProjectsPage();
        registerPage = new RegisterPage();
        resetPasswordPage = new ResetPasswordPage();
    });

    it('when user trying to signin with wrong credentials he should stay on “Sign In” page and see error notification', () => {
        loginPage.navigateTo();
        loginPage.fillCredentials(wrongCredentias);
        expect(loginPage.getPageTitleText()).toEqual('Sign In');
        expect(loginPage.getErrorMessage()).toEqual('Invalid password or email');
    });

    it('when login is successful — he should redirect to default “Projects” page', () => {
        loginPage.navigateTo();
        loginPage.fillCredentials();
        expect(projectsPage.getPageTitleText()).toEqual('Projects');
    });

    it('when user clicks “Sign up”, — it should navigate to “Sign In” page', () => {
        loginPage.navigateTo();
        loginPage.navigateToSignUp();
        expect(registerPage.getPageTitleText()).toEqual('Sign Up');
    });

    it('when user clicks “Forgot your password?”, — it should navigate to “Forgot Password” page', () => {
        loginPage.navigateTo();
        loginPage.navigateToForgotPassword();
        expect(resetPasswordPage.getPageTitleText()).toEqual('Forgot Password');
    });
});