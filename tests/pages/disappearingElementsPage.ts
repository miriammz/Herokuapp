import { type Locator, type Page } from '@playwright/test';

export class DisappearingElementsPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly home: Locator;
    readonly about: Locator;
    readonly contact: Locator;
    readonly portfolio: Locator;
    readonly gallery: Locator;
    readonly notFound: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Disappearing Elements' });
        this.title = page.getByRole('heading', { name: 'Disappearing Elements' });
        this.description = page.getByText('This example demonstrates');
        this.home = page.getByRole('link', { name: 'Home' });
        this.about = page.getByRole('link', { name: 'About' });
        this.contact = page.getByRole('link', { name: 'Contact Us' });
        this.portfolio = page.getByRole('link', { name: 'Portfolio' });
        this.gallery = page.getByRole('link', { name: 'Gallery' });
        this.notFound = page.getByRole('heading', { name: 'Not Found' });
    }
}