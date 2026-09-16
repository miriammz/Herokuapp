import { test, expect } from './fixtures/herokuapp-test';
import { BasicAuthPage } from './pages/basicAuthPage';

async function goToSection(basicAuthPage: BasicAuthPage) {
    await basicAuthPage.link.click();
    await expect(basicAuthPage.page).toHaveURL(/basic_auth/);
}

test.describe('Herokuapp Basic Auth con credenciales correctas', () => {

    //acotado a este fichero el uso de credenciales
    test.use({ httpCredentials: { username: 'admin', password: 'admin' } });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to basic Auth', async ({basicAuthPage, request}) => {
        await goToSection(basicAuthPage);
        //se utiliza request para comprobar el comportamiento 
        //evitando el cuadro de diálogo que sale al cargar la web
        const response = await request.get('/basic_auth');
        await expect(response.status()).toBe(200);
        await expect(basicAuthPage.title).toBeVisible();
        await expect(basicAuthPage.title).toHaveText('Basic Auth');
        await expect(basicAuthPage.description).toBeVisible();
    });
});

test.describe('Herokuapp Basic Auth con credenciales incorrectas', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('empty username and password', async ({basicAuthPage, request}) => {
        await goToSection(basicAuthPage);
        const response = await request.get('https://the-internet.herokuapp.com/basic_auth');
        await expect(response.status()).toBe(401);
    });

    test('invalid username and password', async ({basicAuthPage, request}) => {
        await goToSection(basicAuthPage);
        const response = await request.get('https://gerger:rgres@the-internet.herokuapp.com/basic_auth');
        await expect(response.status()).toBe(401);
    });
});