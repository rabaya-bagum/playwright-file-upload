// spec: specs/file-upload.plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { UploadPage } from './page-objects/UploadPage';
import { UPLOAD_FILE_TYPE_CASES } from './data/test-data';
import { createFilePayload } from './utils/file-helper';

test.describe('File Upload', () => {
  // Covers scenarios 1.2–1.5 and 1.13 from the plan.
  // Each case runs the exact same upload flow with a different file type.
  for (const [label, config] of UPLOAD_FILE_TYPE_CASES) {
    test(`Should successfully upload a ${label}`, async ({ page }) => {
      const uploadPage = new UploadPage(page);
      const payload = createFilePayload(config);

      // 1. Navigate to the upload page
      await uploadPage.goto();
      await uploadPage.assertPageLoaded();

      // 2. Select the file
      await uploadPage.selectFile(payload);

      // 3. Click Upload and verify success
      await uploadPage.clickUpload();
      await uploadPage.assertUploadSuccess(config.name);
    });
  }
});
