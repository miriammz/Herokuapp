import { test, expect } from './fixtures/herokuapp-test';
import { FileUploadPage } from './pages/fileUploadPage';
import path from 'path';

async function goToSection(fileUploadPage: FileUploadPage) {
    await fileUploadPage.link.click();
    await expect(fileUploadPage.page).toHaveURL(/upload/);
}

test.describe('Herokuapp File Upload', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to file uploader', async({fileUploadPage}) => {
        await goToSection(fileUploadPage);
        await expect(fileUploadPage.title).toBeVisible();
        await expect(fileUploadPage.title).toHaveText('File Uploader');
        await expect(fileUploadPage.description).toBeVisible();
        await expect(fileUploadPage.chooseFile).toBeVisible();
        await expect(fileUploadPage.chooseFile).toHaveAttribute('type', 'file');
        await expect(fileUploadPage.upload).toBeVisible();
        await expect(fileUploadPage.upload).toHaveText('Upload');
        await expect(fileUploadPage.dragDrop).toBeVisible();
    });

    test('select file', async({fileUploadPage}) => {
        await goToSection(fileUploadPage);
        const filePath = path.join(__dirname, 'files', 'captura.png');
        await fileUploadPage.chooseFile.setInputFiles(filePath);
        await expect(fileUploadPage.chooseFile).toHaveValue(/captura\.png$/);
        await fileUploadPage.upload.click();
        await expect(fileUploadPage.title).not.toBeVisible();
        await expect(fileUploadPage.description).not.toBeVisible();
        await expect(fileUploadPage.chooseFile).not.toBeVisible();
        await expect(fileUploadPage.upload).not.toBeVisible();
        await expect(fileUploadPage.dragDrop).not.toBeVisible();
        await expect(fileUploadPage.title2).toBeVisible();
        await expect(fileUploadPage.title2).toHaveText('File Uploaded!');
        await expect(fileUploadPage.fileName).toBeVisible();
        await expect(fileUploadPage.fileName).toHaveText('captura.png');
    });

    test('drag and drop file', async({fileUploadPage}) => {
        await goToSection(fileUploadPage);
        const filePath = path.join(__dirname, 'files', 'captura.png');
        await fileUploadPage.dragDrop.setInputFiles(filePath);
        await expect(fileUploadPage.name.filter({ hasText: 'captura.png' })).toHaveText('captura.png');
        await expect(fileUploadPage.tick).toBeVisible();
        await expect(fileUploadPage.tick).toHaveText('✔');
    });
});