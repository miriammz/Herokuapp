import { type Locator, type Page } from '@playwright/test';

export class FileDownloadPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly screenshot: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'File Download', exact: true });
        this.title = page.getByRole('heading', { name: 'File Downloader' });
        this.screenshot = page.getByRole('link', { name: 'captura.png' });
    }
}