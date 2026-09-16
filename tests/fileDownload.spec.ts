import { test, expect } from './fixtures/herokuapp-test';
import { FileDownloadPage } from './pages/fileDownloadPage';

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
        await expect(fileDownloadPage.screenshot).toHaveAttribute('href', 'download/captura\.png');
    });

    test('download the file', async({fileDownloadPage}) => {
        await goToSection(fileDownloadPage);
        const download1Promise = fileDownloadPage.page.waitForEvent('download');
        await fileDownloadPage.screenshot.click();
        const download1 = await download1Promise;
        await expect(download1.suggestedFilename()).toBe('captura.png');
    });
});