import { test, expect } from './fixtures/herokuapp-test';

let contador = 0;

test('checkbox 1 se marca', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.waitForTimeout(3000);
    await page.locator('input[type="checkbox"]').nth(0).check();
    expect(await page.locator('input[type="checkbox"]').nth(0).isChecked()).toBe(true);
    contador++;
});

test('checkbox 2 depende del anterior', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    expect(contador).toBe(1);
    await page.locator('input[type="checkbox"]').nth(1).uncheck();
    expect(page.locator('input[type="checkbox"]').nth(1)).not.toBeChecked();
});