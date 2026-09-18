import { type Locator, type Page } from '@playwright/test';

export class SortableDataTablesPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly example1: Locator;
    readonly description1: Locator;
    readonly table1: Locator;
    readonly lastName1: Locator;
    readonly firstName1: Locator;
    readonly email1: Locator;
    readonly due1: Locator;
    readonly website1: Locator;
    readonly action1: Locator;
    readonly example2: Locator;
    readonly description2: Locator;
    readonly table2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Sortable Data Tables' });
        this.title = page.getByRole('heading', { name: 'Data Tables' });
        this.description = page.getByText('Often times when you see a');
        this.example1 = page.getByRole('heading', { name: 'Example 1' });
        this.description1 = page.getByText('No Class or ID attributes to');
        this.table1 = page.locator('#table1');
        this.lastName1 = page.locator('#table1').getByText('Last Name');
        this.firstName1 = page.locator('#table1').getByText('First Name');
        this.email1 = page.locator('#table1').getByText('Email');
        this.due1 = page.locator('#table1').getByText('Due');
        this.website1 = page.locator('#table1').getByText('Web Site');
        this.action1 = page.locator('#table1').getByText('Action');
        this.example2 = page.getByRole('heading', { name: 'Example 2' });
        this.description2 = page.getByText('Class and ID attributes to');
        this.table2 = page.locator('#table2');
    }
}