import { type Page, type Locator } from '@playwright/test';

export class BasicAuthPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Basic Auth' });
        this.title = page.getByRole('heading', { name: 'Basic Auth' });
        this.description= page.getByText('Congratulations! You must');
    }
}