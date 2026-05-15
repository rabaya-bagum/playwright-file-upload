// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';

test.describe('File Upload', () => {
  test('Should not allow selecting multiple files simultaneously', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Verify the file input does NOT have the 'multiple' attribute
    const isMultiple = await uploadPage.getFileInputMultiple();
    expect(isMultiple).toBe(false);
  });

  test('Should accept files of any type (no type restriction on the input)', async ({ page }) => {
    const uploadPage = new UploadPage(page);

    // 1. Navigate to the upload page
    await uploadPage.goto();

    // 2. Verify the 'accept' attribute is empty — no client-side file type restriction
    const acceptValue = await uploadPage.getFileInputAccept();
    expect(acceptValue).toBe('');
  });
});
