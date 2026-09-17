import { type Locator, type Page } from '@playwright/test';

export class MultipleWindowsPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly windowLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Multiple Windows' });
        this.title = page.getByRole('heading', { name: 'Opening a new window' });
        this.windowLink = page.getByRole('link', { name: 'Click Here' });
    }
}