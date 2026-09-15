import { test, expect } from './fixtures/herokuapp-test';
import { FramesPage } from './pages/framesPage';
import { AlertsPage } from './pages/javascriptAlertsPage';

async function goToSection(framesPage: FramesPage) {
    await framesPage.link.click();
    await expect(framesPage.page).toHaveURL(/frames/);
}

test.describe('Herokuapp Frames and Nested frames', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to Frames', async({framesPage}) => {
        await goToSection(framesPage);
        await expect(framesPage.title).toBeVisible();
        await expect(framesPage.title).toHaveText('Frames');
        await expect(framesPage.nested).toBeVisible();
        await expect(framesPage.iframe).toBeVisible();
    });

    test('nested frames', async({framesPage}) => {
        await goToSection(framesPage);
        await framesPage.nested.click();
        await expect(framesPage.page).toHaveURL(/nested_frames/);
        await expect(framesPage.left).toBeVisible(); 
        await expect(framesPage.left).toHaveText('LEFT');
        await expect(framesPage.middle).toBeVisible(); 
        await expect(framesPage.middle).toHaveText('MIDDLE');
        await expect(framesPage.right).toBeVisible(); 
        await expect(framesPage.right).toHaveText('RIGHT');
        await expect(framesPage.bottom).toBeVisible(); 
        await expect(framesPage.bottom).toHaveText('BOTTOM');
    });

    test('iframes', async({framesPage}) => {
        await goToSection(framesPage);
        await framesPage.iframe.click();
        await expect(framesPage.page).toHaveURL(/iframe/);
        //la alerta sale porque se usa una API externa gratuita y se ha
        //agotado la cuota mensual, por lo que el text se adapta a lo que
        //se puede hacer ahora mismo (comprobar la alerta y que no cambia 
        //el texto al intentar escribir algo)
        await expect(framesPage.alert).toBeVisible();
        await expect(framesPage.alertText1).toBeVisible();
        await expect(framesPage.alertText2).toBeVisible();
        await framesPage.close.click();
        await expect(framesPage.alert).not.toBeVisible();
        await expect(framesPage.titleiFrame).toBeVisible();
        await expect(framesPage.titleiFrame).toHaveText('An iFrame containing the TinyMCE WYSIWYG Editor');
        await expect(framesPage.iframeContainer).toBeVisible();
        await framesPage.text.pressSequentially('prueba');
        await expect(framesPage.text).toHaveText('Your content goes here.');
    });
});