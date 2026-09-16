import { test, expect } from './fixtures/herokuapp-test';
import { DropdownPage } from './pages/dropdownPage';

async function goToSection(dropdownPage: DropdownPage) {
    await dropdownPage.link.click();
    await expect(dropdownPage.page).toHaveURL(/dropdown/);
}

test.describe('Herokuapp Dropdown', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to dropdown', async ({dropdownPage}) => {
        await goToSection(dropdownPage);
        await expect(dropdownPage.title).toBeVisible();
        await expect(dropdownPage.title).toHaveText('Dropdown List');
        await expect(dropdownPage.dropdown).toBeVisible();
        await expect(dropdownPage.dropdown.locator('option:checked')).toHaveText('Please select an option');
    });

    test('select option 1', async ({dropdownPage}) => {
        await goToSection(dropdownPage);
        await dropdownPage.dropdown.selectOption('1');
        await expect(dropdownPage.dropdown.locator('option:checked')).toHaveText('Option 1');
    });

    test('select option 2', async ({dropdownPage}) => {
        await goToSection(dropdownPage);
        await dropdownPage.dropdown.selectOption('2');
        await expect(dropdownPage.dropdown.locator('option:checked')).toHaveText('Option 2');
    });
});