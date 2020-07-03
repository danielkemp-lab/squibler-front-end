
import { browser, by, element } from 'protractor';

export class ResetPasswordPage {
    navigateTo() {
        return browser.get('/auth/forgot-password');
    }

    fillEmail(email: any) {
        element(by.name('email')).sendKeys(email);
        element(by.className('auth__button')).click();
    }

    getDummyString(length) {
        let string = '';
        const letters = 'abcdefghijklmnopqrstuvwxyz'
        for (let i = 0; i < length; i++) {
            string += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return string;
    }

    getPageTitleText() {
        return element(by.className('auth__title')).getText();
    }

    getErrorMessage() {
        let div = element(by.className('auth__error'));
        return div.element(by.tagName('div')).getText();
    }

    getConfirmMessage() {
        return element(by.id('confirmCodeSuccess')).isPresent();
    }

    navigateToSignUp() {
        let div = element(by.className('auth__footer'));
        div.element(by.tagName('a:nth-child(1)')).click();
    }

    navigateToSignIn() {
        let div = element(by.className('auth__footer'));
        div.element(by.tagName('a:nth-child(2)')).click();
    }
}

