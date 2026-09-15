import { type Locator, type Page } from "@playwright/test";

export class DragAndDropPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly a: Locator;
    readonly b: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Drag and Drop' });
        this.title = page.getByRole('heading', { name: 'Drag and Drop' });
        this.a = page.locator('#column-a');
        this.b = page.locator('#column-b');
    }
}