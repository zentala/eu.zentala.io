import { test, expect } from '@playwright/test';

test.describe('Timeline Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ui');
  });

  test('Timeline container renders with correct styles', async ({ page }) => {
    const container = page.locator('.max-w-6xl');
    await expect(container).toHaveClass(/bg-blue-900/);
    await expect(container).toHaveClass(/rounded-xl/);
    await expect(container).toHaveClass(/shadow-lg/);
  });

  test('Timeline items render with correct content', async ({ page }) => {
    const items = page.locator('.bg-gray-800');
    await expect(items).toHaveCount(3); // We have 3 timeline items by default

    // Check first item content
    const firstItem = items.first();
    await expect(firstItem.locator('.font-bold')).toContainText('2025-2030');
    await expect(firstItem.locator('.text-lg')).toContainText('Infrastructure');
  });

  test('Timeline items have correct styles', async ({ page }) => {
    const item = page.locator('.bg-gray-800').first();
    await expect(item).toHaveClass(/rounded-xl/);
    await expect(item).toHaveClass(/shadow-md/);
    await expect(item).toHaveClass(/border-2/);
    await expect(item).toHaveClass(/border-blue-400/);
  });

  test('Timeline has correct title', async ({ page }) => {
    const title = page.locator('#timeline h2.text-3xl.text-center.text-white');
    await expect(title).toContainText('Vision Timeline');
    await expect(title).toHaveClass(/font-bold/);
  });

  test('Timeline connector line is present', async ({ page }) => {
    const line = page.locator('.h-2.bg-blue-700');
    await expect(line).toBeVisible();
  });
}); 