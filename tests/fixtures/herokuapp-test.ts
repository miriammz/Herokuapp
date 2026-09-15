import { test as base } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamicLoadingPage';
import { DisappearingElementsPage } from '../pages/disappearingElementsPage';
import { AlertsPage } from '../pages/javascriptAlertsPage';
import { FramesPage } from '../pages/framesPage';
import { CheckboxesPage } from '../pages/checkboxesPage';

type HerokuappFixtures = {
    dynamicLoadingPage: DynamicLoadingPage;
    disappearingElementsPage: DisappearingElementsPage;
    alertsPage: AlertsPage;
    framesPage: FramesPage;
    checkboxesPage: CheckboxesPage;
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
    }
});

export { expect } from '@playwright/test';