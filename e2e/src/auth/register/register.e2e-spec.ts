import { RegisterPage } from './register.po';
import { ProjectsPage } from '../../dashboard/projects/projects.po';
import { LoginPage } from '../login/login.po';
describe('Register page', () => {
    let registerPage: RegisterPage;
    let projectsPage: ProjectsPage;
    let loginPage: LoginPage;
    const existCredentias = {
        email: 'ihor.kozar9999@gmail.com',
        password: 'asdf1234'
    };

    beforeEach(() => {
        registerPage = new RegisterPage();
        projectsPage = new ProjectsPage();
        loginPage = new LoginPage();
    });

    it('when user trying to signup with exist credentials he should stay on “Sign Up” page and see error notification', () => {
        registerPage.navigateTo();
        registerPage.fillCredentials(existCredentias);
        expect(registerPage.getPageTitleText()).toEqual('Sign Up');
        expect(registerPage.getErrorMessage()).toEqual('User already exist');
    });

    it('when signup is successful — he should redirect to default “Projects” page', () => {
        registerPage.navigateTo();
        const randomCredentias = {
            email: registerPage.getDummyMail(5),
            password: 'asdf1234'
        };
        registerPage.fillCredentials(randomCredentias);
        expect(projectsPage.getPageTitleText()).toEqual('Projects');
    });

    it('when user clicks “Sign in”, — it should navigate to “Sign In” page', () => {
        registerPage.navigateTo();
        registerPage.navigateToSignIn();
        expect(loginPage.getPageTitleText()).toEqual('Sign In');
    });
});