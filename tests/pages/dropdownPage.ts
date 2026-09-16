import { type Locator, type Page } from '@playwright/test';

export class DropdownPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Dropdown' });
        this.title = page.getByRole('heading', { name: 'Dropdown List' });
        this.dropdown = page.locator('#dropdown');
    }
}