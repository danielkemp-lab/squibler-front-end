
import { browser, by, element } from 'protractor';

export class RegisterPage {
    navigateTo() {
        return browser.get('/auth/register');
    }

    fillCredentials(credentias: any) {
        element(by.name('email')).sendKeys(credentias.email);
        element(by.name('password')).sendKeys(credentias.password);
        element(by.className('auth__button_signup')).click();
    }

    getDummyMail(length) {
        let string = '';
        const letters = 'abcdefghijklmnopqrstuvwxyz'
        for (let i = 0; i < length; i++) {
            string += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return string + "@dummy.com";
    }

    getPageTitleText() {
        return element(by.className('auth__title')).getText();
    }

    getErrorMessage() {
        return element(by.className('auth__error')).getText();
    }

    navigateToSignIn() {
        let div = element(by.className('auth__footer'));
        div.element(by.tagName('a')).click();
    }
}

