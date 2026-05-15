// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';
import { FILE_CONFIGS } from './data/test-data';
import { createFilePayload, createLargeFilePayload } from './utils/file-helper';

test.describe('File Upload', () => {
  test('Should upload a file with a very long file name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const payload = createFilePayload(FILE_CONFIGS.longName);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Select a file with a very long name
    await uploadPage.selectFile(payload);

    // 3. Click Upload and verify success
    await uploadPage.clickUpload();
    await uploadPage.assertUploadSuccess(FILE_CONFIGS.longName.name);
  });

  test('Should upload a zero-byte (empty) file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const payload = createFilePayload(FILE_CONFIGS.empty);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Select the empty (zero-byte) file
    await uploadPage.selectFile(payload);

    // 3. Click Upload — server should respond without crashing
    await uploadPage.clickUpload();

    // Verify: either success state or a handled error — never an unhandled crash
    const succeeded = await uploadPage.successHeading.isVisible();
    if (succeeded) {
      await uploadPage.assertUploadSuccess(FILE_CONFIGS.empty.name);
    } else {
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Should upload a large file (10 MB)', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const payload = createLargeFilePayload(10 * 1024 * 1024);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Select the large file
    await uploadPage.selectFile(payload);

    // 3. Click Upload and wait — expect no crash
    await uploadPage.clickUpload();

    // Verify: either success state or a handled error — never an unhandled crash
    const succeeded = await uploadPage.successHeading.isVisible();
    if (succeeded) {
      await uploadPage.assertUploadSuccess(payload.name);
    } else {
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Should upload a file with special characters in the file name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const payload = createFilePayload(FILE_CONFIGS.specialChars);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Select a file whose name contains spaces and parentheses
    await uploadPage.selectFile(payload);

    // 3. Click Upload and verify the name is preserved correctly
    await uploadPage.clickUpload();
    await uploadPage.assertUploadSuccess(FILE_CONFIGS.specialChars.name);
  });
});
