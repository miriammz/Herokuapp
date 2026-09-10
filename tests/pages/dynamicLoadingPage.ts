import { type Locator, type Page } from '@playwright/test';

export class DynamicLoadingPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly firstText: Locator;
    readonly secondText: Locator;
    readonly firstLink: Locator;
    readonly secondLink: Locator;
    readonly example1: Locator;
    readonly example2: Locator;
    readonly startButton: Locator;
    readonly loading: Locator;
    readonly bar: Locator;
    readonly hello: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Dynamic Loading' });
        this.title = page.getByRole('heading', { name: 'Dynamically Loaded Page' });
        this.firstText = page.getByText('It\'s common to see an action');
        this.secondText = page.getByText('There are two examples. One');
        this.firstLink = page.getByRole('link', { name: 'Example 1: Element on page' });
        this.secondLink = page.getByRole('link', { name: 'Example 2: Element rendered' });
        this.example1 = page.getByRole('heading', { name: 'Example 1: Element on page' });
        this.example2 = page.getByRole('heading', { name: 'Example 2: Element rendered' });
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.loading = page.getByText('Loading...');
        this.bar = page.locator('#loading').getByRole('img');
        this.hello = page.getByRole('heading', { name: 'Hello World!' });
    }
}