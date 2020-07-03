import { browser, by, element } from 'protractor';
export class LoginPage {
    private credentias = {
        email: 'ihor.kozar9999@gmail.com',
        password: 'asdf1234'
    };

    navigateTo() {
        return browser.get('/auth/login');
    }

    fillCredentials(credentias: any = this.credentias) {
        element(by.name('email')).sendKeys(credentias.email);
        element(by.name('password')).sendKeys(credentias.password);
        element(by.className('auth__button')).click();
    }

    getPageTitleText() {
        return element(by.className('auth__title')).getText();
    }

    getErrorMessage() {
        return element(by.className('auth__error')).getText();
    }

    navigateToSignUp() {
        let div = element(by.className('auth__footer'));
        div.element(by.tagName('a')).click();
    }

    navigateToForgotPassword() {
        let div = element(by.className('auth__forgot'));
        div.element(by.tagName('a')).click();
    }
}