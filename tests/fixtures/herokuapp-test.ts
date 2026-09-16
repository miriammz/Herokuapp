import { test as base } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamicLoadingPage';
import { DisappearingElementsPage } from '../pages/disappearingElementsPage';
import { AlertsPage } from '../pages/javascriptAlertsPage';
import { FramesPage } from '../pages/framesPage';
import { CheckboxesPage } from '../pages/checkboxesPage';
import { DragAndDropPage } from '../pages/dragAndDropPage';
import { DropdownPage } from '../pages/dropdownPage';
import { HoversPage } from '../pages/hoversPage';
import { BasicAuthPage } from '../pages/basicAuthPage';
import { FileUploadPage } from '../pages/fileUploadPage';
import { FileDownloadPage } from '../pages/fileDownloadPage';

type HerokuappFixtures = {
    dynamicLoadingPage: DynamicLoadingPage;
    disappearingElementsPage: DisappearingElementsPage;
    alertsPage: AlertsPage;
    framesPage: FramesPage;
    checkboxesPage: CheckboxesPage;
    dragAndDropPage: DragAndDropPage;
    dropdownPage: DropdownPage;
    hoversPage: HoversPage;
    basicAuthPage: BasicAuthPage;
    fileUploadPage: FileUploadPage;
    fileDownloadPage: FileDownloadPage;
}

export const test = base.extend<HerokuappFixtures>({
    dynamicLoadingPage: async ({ page }, use) => {
        await use(new DynamicLoadingPage(page));
    },

    disappearingElementsPage: async ({ page }, use) => {
        await use(new DisappearingElementsPage(page));
    },

    alertsPage: async ({page}, use) => {
        await use(new AlertsPage(page));
    },

    framesPage: async ({page}, use) => {
        await use(new FramesPage(page));
    },

    checkboxesPage: async ({page}, use) => {
        await use(new CheckboxesPage(page));
    },

    dragAndDropPage: async ({page}, use) => {
        await use(new DragAndDropPage(page));
    },

    dropdownPage: async ({page}, use) => {
        await use(new DropdownPage(page));
    },

    hoversPage: async ({page}, use) => {
        await use(new HoversPage(page));
    }, 

    basicAuthPage: async ({page}, use) => {
        await use(new BasicAuthPage(page));
    },

    fileUploadPage: async ({page}, use) => {
        await use(new FileUploadPage(page));
    },

    fileDownloadPage: async ({page}, use) => {
        await use(new FileDownloadPage(page));
    }
});

export { expect } from '@playwright/test';