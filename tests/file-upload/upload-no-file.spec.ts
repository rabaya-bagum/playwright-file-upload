// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';
import { PAGE_TEXTS } from './data/test-data';

test.describe('File Upload', () => {
  test('Should return an error when uploading with no file selected', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // 1. Navigate to the upload page
    await uploadPage.goto();
    await uploadPage.assertPageLoaded();

    // 2. Click Upload without selecting any file
    await uploadPage.clickUpload();

    // Verify: server returns an error page
    await expect(page.getByRole('heading', { name: PAGE_TEXTS.errorHeading })).toBeVisible();

    // Verify: success heading is NOT shown
    await expect(uploadPage.successHeading).not.toBeVisible();
  });
});
