import { type Locator, type Page } from '@playwright/test';

export class HoversPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly avatar1: Locator;
    readonly avatar2: Locator;
    readonly avatar3: Locator;
    readonly user1: Locator;
    readonly user2: Locator;
    readonly user3: Locator;
    readonly profile: Locator;
    readonly notFound: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Hovers' });
        this.title = page.getByRole('heading', { name: 'Hovers' });
        this.description = page.getByText('Hover over the image for');
        this.avatar1 = page.getByRole('img', { name: 'User Avatar' }).first();
        this.avatar2 = page.getByRole('img', { name: 'User Avatar' }).nth(1);
        this.avatar3 = page.getByRole('img', { name: 'User Avatar' }).nth(2);
        this.user1 = page.getByRole('heading', { name: 'name: user1' });
        this.user2 = page.getByRole('heading', { name: 'name: user2' });
        this.user3 = page.getByRole('heading', { name: 'name: user3' });
        this.profile = page.getByRole('link', { name: 'View profile' });
        this.notFound = page.getByRole('heading', { name: 'Not Found' });
    }
}