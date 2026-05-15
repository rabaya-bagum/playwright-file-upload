// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';
import { PAGE_TEXTS } from './data/test-data';

test.describe('File Upload', () => {
  test('Should display the upload form correctly on page load', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // Verify: page title
    await expect(page).toHaveTitle(PAGE_TEXTS.title);

    // Verify: heading 'File Uploader' is visible
    await expect(uploadPage.pageHeading).toBeVisible();

    // Verify: instruction text is visible
    await expect(uploadPage.instructionText).toBeVisible();

    // Verify: Choose File input is visible and enabled
    await expect(uploadPage.fileInput).toBeVisible();
    await expect(uploadPage.fileInput).toBeEnabled();

    // Verify: Upload button is visible and enabled
    await expect(uploadPage.uploadButton).toBeVisible();
    await expect(uploadPage.uploadButton).toBeEnabled();
  });
});
