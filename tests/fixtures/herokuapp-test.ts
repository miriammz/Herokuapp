import { test as base } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamicLoadingPage';
import { DisappearingElementsPage } from '../pages/disappearingElementsPage';

type HerokuappFixtures = {
    dynamicLoadingPage: DynamicLoadingPage;
    disappearingElementsPage: DisappearingElementsPage;
}

export const test = base.extend<HerokuappFixtures>({
    dynamicLoadingPage: async ({ page }, use) => {
        await use(new DynamicLoadingPage(page));
    },

    disappearingElementsPage: async ({ page }, use) => {
        await use(new DisappearingElementsPage(page));
    }
});

export { expect } from '@playwright/test';