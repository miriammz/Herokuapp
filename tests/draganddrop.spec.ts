import { test, expect } from './fixtures/herokuapp-test';
import { DragAndDropPage } from './pages/dragAndDropPage';

async function goToSection(dragAndDropPage: DragAndDropPage) {
    await dragAndDropPage.link.click();
    await expect(dragAndDropPage.page).toHaveURL(/drag_and_drop/);
}

test.describe('Herokuapp Drag and Drop', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to drag and drop', async({dragAndDropPage}) => {
        await goToSection(dragAndDropPage);
        await expect(dragAndDropPage.title).toBeVisible();
        await expect(dragAndDropPage.title).toHaveText('Drag and Drop');
        await expect(dragAndDropPage.a).toBeVisible();
        await expect(dragAndDropPage.a).toHaveText('A');
        await expect(dragAndDropPage.a).toHaveAttribute('draggable', 'true');
        await expect(dragAndDropPage.b).toBeVisible();
        await expect(dragAndDropPage.b).toHaveText('B');
        await expect(dragAndDropPage.b).toHaveAttribute('draggable', 'true');
    });

    test('move A to B position', async({dragAndDropPage}) => {
        await goToSection(dragAndDropPage);
        await dragAndDropPage.a.dragTo(dragAndDropPage.b);
        await expect(dragAndDropPage.a).toHaveText('B');
        await expect(dragAndDropPage.b).toHaveText('A');
    });

    test('move B to A position', async({dragAndDropPage}) => {
        await goToSection(dragAndDropPage);
        await dragAndDropPage.b.dragTo(dragAndDropPage.a);
        await expect(dragAndDropPage.a).toHaveText('B');
        await expect(dragAndDropPage.b).toHaveText('A');
    });
});