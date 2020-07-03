import { LoginPage } from '../../auth/login/login.po';
import { SettingPage } from './settings.po';

describe('Setting page', () => {
    let settingPage: SettingPage;
    let loginPage: LoginPage;
    const passwords1 = {
        oldPassword: 'asdf1234',
        newPassword: 'aaaa1111'
    };

    const passwords2 = {//This is used to restore old password for another tests
        oldPassword: 'aaaa1111',
        newPassword: 'asdf1234'
    };

    const dummyEmail = "test@email.com";
    const testEmail = "ihor.kozar9999@gmail.com"//This is used to restore email for another tests.

    const wrongCardInfo = {
        cardNumber: '111111111111111111',
        cardDate: '12/2099',
        cardCvc: '1111'
    };

    const expiredCardInfo = {
        cardNumber: '111111111111111111',
        cardDate: '12/2010',
        cardCvc: '1111'
    };

    beforeEach(() => {
        loginPage = new LoginPage();
        settingPage = new SettingPage();
    });

    it('when user inputs wrong card info — it should show  “Your card number is incorrect.”', () => {
        settingPage.navigateTo();
        settingPage.updatePayment(wrongCardInfo);
        expect(settingPage.getPaymentError()).toEqual('Your card number is incorrect.');
    }); 

    it('when user inputs expired card date — it should show  “Your card is expired!”', () => {
        settingPage.navigateTo();
        settingPage.updatePayment(expiredCardInfo);
        expect(settingPage.getCardError()).toEqual('Your card is expired!');
    }); 

    it('when email change is successful — it should show  “Profile Updated!”', () => {
        settingPage.navigateTo();
        settingPage.emailChange(dummyEmail);
        expect(settingPage.getProfileUpdatedMessage()).toBeTruthy();
        settingPage.emailChange(testEmail);
        expect(settingPage.getProfileUpdatedMessage()).toBeTruthy();
    });
    
    it('when user clicks logout — it should redirect  “Sign In”', () => {
        settingPage.navigateTo();
        settingPage.navigateToSignIn();
        expect(loginPage.getPageTitleText()).toEqual('Sign In');
    }); 
});