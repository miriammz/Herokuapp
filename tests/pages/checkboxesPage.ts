import { type Locator, type Page } from '@playwright/test';

export class CheckboxesPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly checkboxes: Locator;
    readonly first: Locator;
    readonly second: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Checkboxes' });
        this.title = page.getByRole('heading', { name: 'Checkboxes' });
        this.checkboxes = page.getByText('checkbox 1 checkbox');
        this.first = page.getByRole('checkbox').first();
        this.second = page.getByRole('checkbox').nth(1);
    }
}