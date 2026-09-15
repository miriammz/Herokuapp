import { test, expect } from './fixtures/herokuapp-test';
import { CheckboxesPage } from './pages/checkboxesPage';

async function goToSection(checkboxesPage: CheckboxesPage) {
    await checkboxesPage.link.click();
    await expect(checkboxesPage.page).toHaveURL(/checkboxes/);
}

test.describe('Herokuapp Checkboxes', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to checkboxes', async({checkboxesPage}) => {
        await goToSection(checkboxesPage);
        await expect(checkboxesPage.title).toBeVisible();
        await expect(checkboxesPage.title).toHaveText('Checkboxes');
        await expect(checkboxesPage.checkboxes).toBeVisible();
        await expect(checkboxesPage.checkboxes).toHaveText('checkbox 1 checkbox 2');
        await expect(checkboxesPage.first).toBeVisible();
        await expect(checkboxesPage.first).not.toBeChecked();
        await expect(checkboxesPage.second).toBeVisible();
        await expect(checkboxesPage.second).toBeChecked();
    });

    test('change checkboxes', async ({checkboxesPage}) => {
        await goToSection(checkboxesPage);
        await expect(checkboxesPage.first).not.toBeChecked();
        await checkboxesPage.first.check();
        await expect(checkboxesPage.first).toBeChecked();
        await expect(checkboxesPage.second).toBeChecked();
        await checkboxesPage.second.uncheck();
        await expect(checkboxesPage.second).not.toBeChecked();
    });
});