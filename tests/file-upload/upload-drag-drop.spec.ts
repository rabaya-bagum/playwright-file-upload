// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';
import { FILE_CONFIGS } from './data/test-data';
import { createFilePayload } from './utils/file-helper';

test.describe('File Upload', () => {
  test('Should upload a file via drag and drop', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const payload = createFilePayload(FILE_CONFIGS.text);

    // 1. Navigate to the upload page
    await uploadPage.goto();
    await uploadPage.assertPageLoaded();

    // 2. Simulate drag-and-drop: set the file input via DataTransfer API
    await uploadPage.dragAndDropFile(payload);

    // 3. Click Upload and verify success
    await uploadPage.clickUpload();
    await uploadPage.assertUploadSuccess(FILE_CONFIGS.text.name);
  });
});
