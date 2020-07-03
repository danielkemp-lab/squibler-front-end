import { browser, by, element, ExpectedConditions } from 'protractor';

export class ProjectBoxesPage {
    navigateTo() {
        return browser.get('/dashboard/projects');
    }

    getPageTitleText() {
        return element(by.className('projects__title')).getText();
    }
    
    openDemo() {
        browser.actions().mouseMove(element(by.css('.project-item__thumbnail'))).perform();

        var deleteButton = element(by.css('.project-item__thumbnail'));  
        browser.wait(ExpectedConditions.elementToBeClickable(deleteButton), 5000);  
        
        browser.actions().mouseMove(deleteButton).click().perform();
        EmailTemplates.confirmDelete.click();
    }

}