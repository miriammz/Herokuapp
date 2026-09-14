import { test, expect } from './fixtures/herokuapp-test';
import { AlertsPage } from './pages/javascriptAlertsPage';

async function goToSection(alertsPage: AlertsPage) {
   await alertsPage.link.click();
    await expect(alertsPage.page).toHaveURL(/javascript_alerts/);
}

async function dialogAccept(alertsPage: AlertsPage, text: String) {
    alertsPage.page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe(`I am a JS ${text}`);
        await dialog.accept();
    });
}

async function dialogCancel(alertsPage: AlertsPage, text: String) {
    alertsPage.page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe(`I am a JS ${text}`);
        await dialog.dismiss();
    });
}

async function dialogPrompt(alertsPage: AlertsPage, text: String) {
    alertsPage.page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe(`I am a JS ${text}`);
        await dialog.accept('hola!');
    });
}

test.describe('Herokuapp Javascript Alerts', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to Javascript alerts', async({alertsPage}) => {
        await goToSection(alertsPage);
        await expect(alertsPage.title).toBeVisible();
        await expect(alertsPage.title).toHaveText('JavaScript Alerts');
        await expect(alertsPage.description).toBeVisible();
        await expect(alertsPage.alert).toBeVisible();
        await expect(alertsPage.alert).toHaveText('Click for JS Alert');
        await expect(alertsPage.confirm).toBeVisible();
        await expect(alertsPage.confirm).toHaveText('Click for JS Confirm');
        await expect(alertsPage.prompt).toBeVisible();
        await expect(alertsPage.prompt).toHaveText('Click for JS Prompt');
        await expect(alertsPage.result).toBeVisible();
        await expect(alertsPage.result).toHaveText('Result:');
    });

    test('JS alert', async ({alertsPage}) => {
        await goToSection(alertsPage);
        await dialogAccept(alertsPage, 'Alert');
        await alertsPage.alert.click();
        await expect(alertsPage.resultAlert).toBeVisible();
        await expect(alertsPage.resultAlert).toHaveText('You successfully clicked an alert');
    });

    test('JS confirm ok', async ({alertsPage}) => {
        await goToSection(alertsPage);
        await dialogAccept(alertsPage, 'Confirm');
        await alertsPage.confirm.click();
        await expect(alertsPage.resultConfirmOk).toBeVisible();
        await expect(alertsPage.resultConfirmOk).toHaveText('You clicked: Ok');
    });

    test('JS confirm cancel', async ({alertsPage}) => {
        await goToSection(alertsPage);
        await dialogCancel(alertsPage, 'Confirm');
        await alertsPage.confirm.click();
        await expect(alertsPage.resultConfirmCancel).toBeVisible();
        await expect(alertsPage.resultConfirmCancel).toHaveText('You clicked: Cancel');
    });

    test('JS prompt ok', async ({alertsPage}) => {
        await goToSection(alertsPage);
        await dialogPrompt(alertsPage, 'prompt');
        await alertsPage.prompt.click();
        await expect(alertsPage.resultPrompt).toBeVisible();
        await expect(alertsPage.resultPrompt).toHaveText('You entered: hola!');
    });

    test('JS prompt cancel', async ({alertsPage}) => {
        await goToSection(alertsPage);
        await dialogCancel(alertsPage, 'prompt');
        await alertsPage.prompt.click();
        await expect(alertsPage.resultPrompt).toBeVisible();
        await expect(alertsPage.resultPrompt).toHaveText('You entered: null');
    });
});