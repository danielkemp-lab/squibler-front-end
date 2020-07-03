
import { browser, by, element, ExpectedConditions } from 'protractor';

export class ProjectsPage {
    navigateTo() {
        return browser.get('/dashboard/projects');
    }

    getPageTitleText() {
        return element(by.className('projects__title')).getText();
    }
    
    navigateToProjectBoxes() {
        element(by.css('.button-add-project')).click();
    }

}



