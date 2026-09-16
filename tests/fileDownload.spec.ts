import { test, expect } from './fixtures/herokuapp-test';
import { FileDownloadPage } from './pages/fileDownloadPage';
import path from 'path';

async function goToSection(fileDownloadPage: FileDownloadPage) {
    await fileDownloadPage.link.click();
    await expect(fileDownloadPage.page).toHaveURL(/download/);
}

test.describe('Herokuapp File Download', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to file download', async({fileDownloadPage}) => {
        await goToSection(fileDownloadPage);
        await expect(fileDownloadPage.title).toBeVisible();
        await expect(fileDownloadPage.title).toHaveText('File Downloader');
        await expect(fileDownloadPage.screenshot).toBeVisible();
        await expect(fileDownloadPage.screenshot).toHaveText('captura.png');
        await expect(fileDownloadPage.screenshot).toHaveAttribute('href', /captura\.png$/);
    });

    test('download the file', async({fileDownloadPage, fileUploadPage}) => {
        //se sube primero el fichero para no depender de un externo
        await fileUploadPage.link.click();
        await expect(fileUploadPage.page).toHaveURL(/upload/);
        const filePath = path.join(__dirname, 'files', 'captura.png');
        await fileUploadPage.uploadFile(filePath);
        await fileUploadPage.upload.click();
        await expect(fileUploadPage.title2).toBeVisible();
        await fileDownloadPage.page.goto('/');
        await goToSection(fileDownloadPage);
        const download1Promise = fileDownloadPage.page.waitForEvent('download');
        await fileDownloadPage.screenshot.click();
        const download1 = await download1Promise;
        await expect(download1.suggestedFilename()).toBe('captura.png');
    });
});