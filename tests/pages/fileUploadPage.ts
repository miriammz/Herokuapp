import { type Page, type Locator } from '@playwright/test';

export class FileUploadPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly chooseFile: Locator;
    readonly upload: Locator;
    readonly square: Locator;
    readonly dragDrop: Locator;
    readonly title2: Locator;
    readonly fileName: Locator;
    readonly name: Locator;
    readonly tick: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'File Upload' });
        this.title = page.getByRole('heading', { name: 'File Uploader' });
        this.description = page.getByText('Choose a file on your system');
        this.chooseFile = page.getByRole('button', { name: 'Choose File' });
        this.upload = page.getByRole('button', { name: 'Upload' });
        this.square = page.locator('#drag-drop-upload');
        this.dragDrop = page.locator('.dz-hidden-input');
        this.title2 = page.getByRole('heading', { name: 'File Uploaded!' });
        this.fileName = page.getByText('captura.png');
        this.name = page.locator('[data-dz-name]');
        this.tick = page.locator('.dz-success .dz-success-mark');
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.chooseFile.setInputFiles(filePath);
    }
}