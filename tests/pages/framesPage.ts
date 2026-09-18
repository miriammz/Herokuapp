import { type Locator, type Page } from '@playwright/test';

export class FramesPage {
    readonly page: Page;
    readonly link: Locator;
    readonly title: Locator;
    readonly nested: Locator;
    readonly iframe: Locator;
    readonly left: Locator;
    readonly middle: Locator;
    readonly right: Locator;
    readonly bottom: Locator;
    readonly alert: Locator;
    readonly alertText1: Locator;
    readonly alertText2: Locator;
    readonly close: Locator;
    readonly titleiFrame: Locator;
    readonly iframeContainer: Locator;
    readonly text: Locator;

    constructor(page: Page) {
        this.page = page;
        this.link = page.getByRole('link', { name: 'Frames', exact: true });
        this.title = page.getByRole('heading', { name: 'Frames' });
        this.nested = page.getByRole('link', { name: 'Nested Frames' });
        this.iframe = page.getByRole('link', { name: 'iFrame' });
        this.left = page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-left"]').contentFrame().locator('body');
        this.middle = page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-middle"]').contentFrame().locator('body');
        this.right = page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-right"]').contentFrame().locator('body');
        this.bottom = page.locator('frame[name="frame-bottom"]').contentFrame().getByText('BOTTOM');
        this.alert = page.getByRole('alert');
        this.alertText1 = page.getByText('TinyMCE is in read-only mode');
        this.alertText2 = page.getByText('Please request that the admin upgrade your plan or add a valid payment method');
        this.close = page.getByRole('button', { name: 'Close' });
        this.titleiFrame = page.getByRole('heading', { name: 'An iFrame containing the' });
        this.iframeContainer = page.locator('iframe[title="Rich Text Area"]').contentFrame().locator('html');
        this.text = page.locator('iframe[title="Rich Text Area"]').contentFrame().locator('#tinymce');    }
}