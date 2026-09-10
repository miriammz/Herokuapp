import { test, expect } from './fixtures/herokuapp-test';
import { DynamicLoadingPage } from './pages/dynamicLoadingPage';

async function goToSection (dynamicLoadingPage: DynamicLoadingPage) {
    await dynamicLoadingPage.link.click();
    await expect(dynamicLoadingPage.page).toHaveURL(/dynamic_loading/);
}

async function start(dynamicLoadingPage: DynamicLoadingPage) {
    await expect(dynamicLoadingPage.startButton).toBeVisible();
    await expect(dynamicLoadingPage.startButton).toHaveText('Start');
    await dynamicLoadingPage.startButton.click();
}

async function loadingChanges(dynamicLoadingPage: DynamicLoadingPage) {
    await expect(dynamicLoadingPage.loading).toBeVisible();
    await expect(dynamicLoadingPage.loading).toHaveText('Loading...');
    await expect(dynamicLoadingPage.bar).toBeVisible();
    await expect(dynamicLoadingPage.loading).toBeHidden({ timeout: 5000 });
    await expect(dynamicLoadingPage.bar).toBeHidden({ timeout: 5000 });
    await expect(dynamicLoadingPage.hello).toBeVisible();
    await expect(dynamicLoadingPage.hello).toHaveText('Hello World!');
}

test.describe('Herokuapp Dynamic loading and Disappearing elements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
    });

    test('go to dynamic loading', async ({ dynamicLoadingPage }) => {
        await goToSection(dynamicLoadingPage);
        await expect(dynamicLoadingPage.title).toHaveText('Dynamically Loaded Page Elements');
        await expect(dynamicLoadingPage.firstText).toBeVisible();
        await expect(dynamicLoadingPage.secondText).toBeVisible();
        await expect(dynamicLoadingPage.firstLink).toBeVisible();
        await expect(dynamicLoadingPage.firstLink).toHaveText('Example 1: Element on page that is hidden');
        await expect(dynamicLoadingPage.secondLink).toBeVisible();
        await expect(dynamicLoadingPage.secondLink).toHaveText('Example 2: Element rendered after the fact');
    });

    test('example 1', async ({ dynamicLoadingPage }) => {
        await goToSection(dynamicLoadingPage);
        await dynamicLoadingPage.firstLink.click();
        await expect(dynamicLoadingPage.page).toHaveURL(/dynamic_loading\/1/);
        await expect(dynamicLoadingPage.title).toHaveText('Dynamically Loaded Page Elements');
        await expect(dynamicLoadingPage.example1).toHaveText('Example 1: Element on page that is hidden');
        await start(dynamicLoadingPage);
        // hello world está ya cargado en el DOM pero oculto
        await expect(dynamicLoadingPage.hello).toBeHidden();
        await loadingChanges(dynamicLoadingPage);
    });

    test('example 2', async ({ dynamicLoadingPage }) => {
        await goToSection(dynamicLoadingPage);
        await dynamicLoadingPage.secondLink.click();
        await expect(dynamicLoadingPage.page).toHaveURL(/dynamic_loading\/2/);
        await expect(dynamicLoadingPage.title).toHaveText('Dynamically Loaded Page Elements');
        await expect(dynamicLoadingPage.example2).toHaveText('Example 2: Element rendered after the fact');
        await start(dynamicLoadingPage);
        // hello world se carga en el DOM cuando se quita el loading
        await expect(dynamicLoadingPage.hello).not.toBeAttached();
        await loadingChanges(dynamicLoadingPage);
    });
});
