import { test, expect } from './fixtures/herokuapp-test';
import { HoversPage } from './pages/hoversPage';

async function goToSection(hoversPage: HoversPage) {
    await hoversPage.link.click();
    await expect(hoversPage.page).toHaveURL(/hovers/);
}

async function notFound(hoversPage: HoversPage, number: number) {
    await hoversPage.profile.click();
    await expect(hoversPage.page).toHaveURL(new RegExp(`/users/${number}`));
    await expect(hoversPage.notFound).toBeVisible();
    await expect(hoversPage.notFound).toHaveText('Not Found');
}

async function profile(hoversPage: HoversPage) {
    await expect(hoversPage.profile).toBeVisible();
    await expect(hoversPage.profile).toHaveText('View profile');
}

test.describe('Herokuapp Hovers', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to hovers', async({hoversPage}) => {
        await goToSection(hoversPage);
        await expect(hoversPage.description).toBeVisible();
        await expect(hoversPage.avatar1).toBeVisible();
        await expect(hoversPage.avatar2).toBeVisible();
        await expect(hoversPage.avatar3).toBeVisible();
    });

    test('hover avatar 1', async ({hoversPage}) => {
        await goToSection(hoversPage);
        await hoversPage.avatar1.hover();
        await expect(hoversPage.user1).toBeVisible();
        await expect(hoversPage.user1).toHaveText('name: user1');
        await profile(hoversPage);
        await notFound(hoversPage, 1);
    });

    test('hover avatar 2', async ({hoversPage}) => {
        await goToSection(hoversPage);
        await hoversPage.avatar2.hover();
        await expect(hoversPage.user2).toBeVisible();
        await expect(hoversPage.user2).toHaveText('name: user2');
        await profile(hoversPage);
        await notFound(hoversPage, 2);
    });

    test('hover avatar 3', async ({hoversPage}) => {
        await goToSection(hoversPage);
        await hoversPage.avatar3.hover();
        await expect(hoversPage.user3).toBeVisible();
        await expect(hoversPage.user3).toHaveText('name: user3');
        await profile(hoversPage);
        await notFound(hoversPage, 3);
    });
});