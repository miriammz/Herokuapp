import { test as base, type Route } from '@playwright/test';
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
import { MultipleWindowsPage } from '../pages/multipleWindowsPage';
import { SortableDataTablesPage } from '../pages/sortableDataTablesPage';

const resourceCache = new Map<string, Promise<{ status: number; contentType: string; body: string }>>();

export async function fulfillFromServer(route: Route, resourceName: string) {
    const url = route.request().url();
    let resource = resourceCache.get(url);

    if (!resource) {
        resource = (async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${resourceName}: HTTP ${response.status}`);
            }
            return {
                status: response.status,
                contentType: response.headers.get('content-type') || 'application/octet-stream',
                body: await response.text()
            };
        })();
        resourceCache.set(url, resource);
    }

    try {
        await route.fulfill(await resource);
    } catch (error) {
        if (resourceCache.get(url) === resource) {
            resourceCache.delete(url);
        }
        throw error;
    }
}

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
    multipleWindowsPage: MultipleWindowsPage;
    sortableDataTablesPage: SortableDataTablesPage;
}

export const test = base.extend<HerokuappFixtures>({
    page: async ({ page }, use) => {
        await page.route('**/css/**/*.css', route => fulfillFromServer(route, 'stylesheet'));
        await page.route('**/js/vendor/jquery-1.11.3.min.js', route => fulfillFromServer(route, 'jQuery'));
        await page.route('**/js/vendor/jquery-ui-1.11.4/jquery-ui.js', route =>
            route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
        );
        await page.route('**/js/foundation/foundation.js', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/javascript',
                body: 'jQuery.fn.foundation = function () { return this; };'
            })
        );
        await page.route('**/js/foundation/foundation.alerts.js', route =>
            route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
        );
        await page.route('**/js/vendor/298279967.js', route =>
            route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
        );

        await use(page);
    },

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
    }, 

    multipleWindowsPage: async ({page}, use) => {
        await use(new MultipleWindowsPage(page));
    }, 

    sortableDataTablesPage: async ({page}, use) => {
        await use(new SortableDataTablesPage(page));
    }
});

export { expect } from '@playwright/test';