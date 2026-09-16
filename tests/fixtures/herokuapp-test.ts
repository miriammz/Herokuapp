import { test as base } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamicLoadingPage';
import { DisappearingElementsPage } from '../pages/disappearingElementsPage';
import { AlertsPage } from '../pages/javascriptAlertsPage';
import { FramesPage } from '../pages/framesPage';
import { CheckboxesPage } from '../pages/checkboxesPage';
import { DragAndDropPage } from '../pages/dragAndDropPage';
import { DropdownPage } from '../pages/dropdownPage';
import { HoversPage } from '../pages/hoversPage';

type HerokuappFixtures = {
    dynamicLoadingPage: DynamicLoadingPage;
    disappearingElementsPage: DisappearingElementsPage;
    alertsPage: AlertsPage;
    framesPage: FramesPage;
    checkboxesPage: CheckboxesPage;
    dragAndDropPage: DragAndDropPage;
    dropdownPage: DropdownPage;
    hoversPage: HoversPage;
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
    }
});

export { expect } from '@playwright/test';