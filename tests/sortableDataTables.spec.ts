import { Locator } from '@playwright/test';
import { test, expect } from './fixtures/herokuapp-test';
import { SortableDataTablesPage } from './pages/sortableDataTablesPage';

async function goToSection(sortableDataTablesPage: SortableDataTablesPage) {
    await sortableDataTablesPage.link.click();
    await expect(sortableDataTablesPage.page).toHaveURL(/tables/);
}

async function sortAndCheck(
    table: Locator,
    column: Locator,
    locator: string,
    isCurrency: boolean = false
) {
    const normalizeForSort = (value: string) => value.trim();
    const compareValues = (left: string, right: string) => {
        if (isCurrency) {
            const leftNum = Number(left.replace(/[$,]/g, ''));
            const rightNum = Number(right.replace(/[$,]/g, ''));
            return leftNum - rightNum;
        }
        return left.localeCompare(right);
    };

    await expect(table.locator(locator).first()).toBeVisible();
    const baseRows = await table.locator(locator).allTextContents();
    const expectedAscending = [...baseRows].map(normalizeForSort).sort(compareValues);

    //orden ascendente
    await column.click();
    await expect(table.locator(locator)).toHaveText(expectedAscending);
    const ascRows = await table.locator(locator).allTextContents();
    expect(ascRows.map(normalizeForSort)).toEqual(expectedAscending);

    //orden descendente
    await column.click();
    await expect(table.locator(locator)).toHaveText(expectedAscending);
    const descRows = await table.locator(locator).allTextContents();
    const expectedDescending = [...expectedAscending].reverse();
    expect(descRows.map(normalizeForSort)).toEqual(expectedDescending);
}

test.describe('Herokuapp Sortable Data Tables', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('go to sortable data tables', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await expect(sortableDataTablesPage.title).toBeVisible();
        await expect(sortableDataTablesPage.title).toHaveText('Data Tables');
        await expect(sortableDataTablesPage.description).toBeVisible();
        await expect(sortableDataTablesPage.example1).toBeVisible();
        await expect(sortableDataTablesPage.example1).toHaveText('Example 1');
        await expect(sortableDataTablesPage.description1).toBeVisible();
        await expect(sortableDataTablesPage.table1).toBeVisible();
        await expect(sortableDataTablesPage.table1.locator('th.header')).toHaveText([
            'Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action'
        ]);
        await expect(sortableDataTablesPage.example2).toBeVisible();
        await expect(sortableDataTablesPage.example2).toHaveText('Example 2');
        await expect(sortableDataTablesPage.description2).toBeVisible();
        await expect(sortableDataTablesPage.table2).toBeVisible();
        await expect(sortableDataTablesPage.table2.locator('th.header')).toHaveText([
            'Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action'
        ]);
    });

    test('sort by last name table 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table1, sortableDataTablesPage.lastName1, 'tbody tr');
    });

    test('sort by first name table 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table1, sortableDataTablesPage.firstName1, 'tbody tr td:nth-child(2)');
    });

    test('sort by email table 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table1, sortableDataTablesPage.email1, 'tbody tr td:nth-child(3)');
    });

    test('sort by due table 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table1, sortableDataTablesPage.due1, 'tbody tr td:nth-child(4)', true);
    });

    test('sort by web site table 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table1, sortableDataTablesPage.website1, 'tbody tr td:nth-child(5)');
    });

    test('sort by action 1', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await expect(sortableDataTablesPage.table1.locator('tbody tr').first()).toBeVisible();
        const defaultText = await sortableDataTablesPage.table1.locator('tbody tr').allTextContents();
        await sortableDataTablesPage.lastName1.click();
        await expect(sortableDataTablesPage.table1.locator('tbody tr').first()).toBeVisible();
        await sortableDataTablesPage.action1.click();
        await expect(sortableDataTablesPage.table1.locator('tbody tr').first()).toBeVisible();
        const textAfter = await sortableDataTablesPage.table1.locator('tbody tr').allTextContents();
        expect(defaultText).toEqual(textAfter);
    });

    test('sort by last name table 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table2, sortableDataTablesPage.lastName2, 'td.last-name');
    });

    test('sort by first name table 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table2, sortableDataTablesPage.firstName2, 'td.first-name');
    });

    test('sort by email table 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table2, sortableDataTablesPage.email2, 'td.email');
    });

    test('sort by due table 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table2, sortableDataTablesPage.due2, 'td.dues', true);
    });

    test('sort by web site table 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await sortAndCheck(sortableDataTablesPage.table2, sortableDataTablesPage.website2, 'td.web-site');
    });

    test('sort by action 2', async({sortableDataTablesPage}) => {
        await goToSection(sortableDataTablesPage);
        await expect(sortableDataTablesPage.table2.locator('td.action').first()).toBeVisible();
        const defaultText = await sortableDataTablesPage.table2.locator('td.action').allTextContents();
        await sortableDataTablesPage.lastName2.click();
        await expect(sortableDataTablesPage.table2.locator('td.action').first()).toBeVisible();
        await sortableDataTablesPage.action2.click();
        await expect(sortableDataTablesPage.table2.locator('td.action').first()).toBeVisible();
        const textAfter = await sortableDataTablesPage.table2.locator('td.action').allTextContents();
        expect(defaultText).toEqual(textAfter);
    });
});