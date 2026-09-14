import { type Locator, type Page } from '@playwright/test';

export class AlertsPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly alert: Locator;
    readonly confirm: Locator;
    readonly prompt: Locator;
    readonly result: Locator;
    readonly resultAlert: Locator;
    readonly resultConfirmOk: Locator;
    readonly resultConfirmCancel: Locator;
    readonly resultPrompt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'JavaScript Alerts' });
        this.title = page.getByRole('heading', { name: 'JavaScript Alerts' });
        this.description = page.getByText('Here are some examples of');
        this.alert = page.getByRole('button', { name: 'Click for JS Alert' });
        this.confirm = page.getByRole('button', { name: 'Click for JS Confirm' });
        this.prompt = page.getByRole('button', { name: 'Click for JS Prompt' });
        this.result = page.getByRole('heading', { name: 'Result:' });
        this.resultAlert = page.getByText('You successfully clicked an');
        this.resultConfirmOk = page.getByText('You clicked: Ok');
        this.resultConfirmCancel = page.getByText('You clicked: Cancel');
        this.resultPrompt = page.getByText('You entered: ');    }
}