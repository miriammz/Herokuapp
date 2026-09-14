import { test, expect } from './fixtures/herokuapp-test';
import { DisappearingElementsPage } from './pages/disappearingElementsPage';

async function goToSection (disappearingElementsPage: DisappearingElementsPage) {
    await disappearingElementsPage.link.click();
    await expect(disappearingElementsPage.page).toHaveURL(/disappearing_elements/);
}

async function expectNotVisible (disappearingElementsPage: DisappearingElementsPage) {
    await expect(disappearingElementsPage.home).not.toBeVisible();
    await expect(disappearingElementsPage.about).not.toBeVisible();
    await expect(disappearingElementsPage.contact).not.toBeVisible();
    await expect(disappearingElementsPage.portfolio).not.toBeVisible();
}

async function expectGalleryIfVisible (disappearingElementsPage: DisappearingElementsPage) {
    return await disappearingElementsPage.gallery.count() > 0;
}

test.describe('Herokuapp Disappearing elements', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to disappearing elements', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        await expect(disappearingElementsPage.title).toHaveText('Disappearing Elements');
        await expect(disappearingElementsPage.description).toBeVisible();
        await expect(disappearingElementsPage.home).toBeVisible();
        await expect(disappearingElementsPage.home).toHaveText('Home');
        await expect(disappearingElementsPage.about).toBeVisible();
        await expect(disappearingElementsPage.about).toHaveText('About');
        await expect(disappearingElementsPage.contact).toBeVisible();
        await expect(disappearingElementsPage.contact).toHaveText('Contact Us');
        await expect(disappearingElementsPage.portfolio).toBeVisible();
        await expect(disappearingElementsPage.portfolio).toHaveText('Portfolio');
        const gallery = await expectGalleryIfVisible(disappearingElementsPage);
        if (gallery) {
            await expect(disappearingElementsPage.gallery).toHaveText('Gallery');
        };
    });

    test('home', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        await disappearingElementsPage.home.click();
        await expect(disappearingElementsPage.page).not.toHaveURL(/disappearing_elements/);
        await expectNotVisible(disappearingElementsPage);
    });

    test('about', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        await disappearingElementsPage.about.click();
        await expect(disappearingElementsPage.page).toHaveURL(/about/);
        await expectNotVisible(disappearingElementsPage);
        await expect(disappearingElementsPage.notFound).toBeVisible();
        await expect(disappearingElementsPage.notFound).toHaveText('Not Found');
    });

    test('contact us', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        await disappearingElementsPage.contact.click();
        await expect(disappearingElementsPage.page).toHaveURL(/contact-us/);
        await expectNotVisible(disappearingElementsPage);
        await expect(disappearingElementsPage.notFound).toBeVisible();
        await expect(disappearingElementsPage.notFound).toHaveText('Not Found');
    });

    test('portfolio', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        await disappearingElementsPage.portfolio.click();
        await expect(disappearingElementsPage.page).toHaveURL(/portfolio/);
        await expectNotVisible(disappearingElementsPage);
        await expect(disappearingElementsPage.notFound).toBeVisible();
        await expect(disappearingElementsPage.notFound).toHaveText('Not Found');
    });

    test('gallery', async ({disappearingElementsPage}) => {
        await goToSection(disappearingElementsPage);
        const gallery = await expectGalleryIfVisible(disappearingElementsPage);
        if (gallery) {
            await expect(disappearingElementsPage.gallery).toHaveText('Gallery');
            await disappearingElementsPage.gallery.click();
            await expect(disappearingElementsPage.page).toHaveURL(/gallery/);
            await expectNotVisible(disappearingElementsPage);
            await expect(disappearingElementsPage.notFound).toBeVisible();
            await expect(disappearingElementsPage.notFound).toHaveText('Not Found');
        } else {
            test.info().annotations.push({ type: 'note', description: 'Gallery no está presente en esta carga' });
        }
    });
});