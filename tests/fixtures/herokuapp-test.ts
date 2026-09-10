import { test as base } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamicLoadingPage';

type HerokuappFixtures = {
    dynamicLoadingPage: DynamicLoadingPage;
}

export const test = base.extend<HerokuappFixtures>({
    dynamicLoadingPage: async ({ page }, use) => {
        await use(new DynamicLoadingPage(page));
    }
});

export { expect } from '@playwright/test';