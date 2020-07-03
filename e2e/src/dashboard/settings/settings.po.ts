import { browser, by, element } from 'protractor';
export class SettingPage {
    navigateTo() {
        return browser.get('/dashboard/profile');
    }

    updatePayment(cardInfo: any) {
        element(by.className('settings__subscription-button')).click();
        let div = element(by.id('cardForm'));
        div.element(by.name('cardnumber')).sendKeys(cardInfo.cardNumber);
        div.element(by.className('date')).sendKeys(cardInfo.cardDate);
        div.element(by.className('cvc')).sendKeys(cardInfo.cardCvc);
        element(by.id('updatePayment')).click();
    }

    emailChange(email: any){
        let tabs = element(by.id('settings-tabs'));
        let tab = tabs.element(by.className('email'));
        let input = tab.element(by.className('email'));
        input.clear();
        input.sendKeys(email);
        element(by.id('profileChange')).click();
    }
    
    passwordChange(passwords: any){
        let tabs = element(by.id('settings-tabs'));
        tabs.element(by.id('oldPassword')).sendKeys(passwords.oldPassword);
        tabs.element(by.id('newPassword')).sendKeys(passwords.newPassword);
        element(by.id('profileChange')).click();
    }

    getProfileUpdatedMessage(){
        return element(by.id('profile_updated')).isPresent();
    }

    getProfileTitleText() {
        return element(by.className('settings__block-title:nth-child(1)')).getText();
    }

    navigateToSignIn() {
        element(by.className('settings__logout')).click();
    }

    getCardError(){
        return element(by.id('cardError')).getText();
    }

    getPaymentError(){
        return element(by.id('paymentError')).getText();
    }
}