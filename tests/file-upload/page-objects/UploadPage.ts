import { Page, Locator, expect } from '@playwright/test';
import { UPLOAD_URL, PAGE_TEXTS } from '../data/test-data';
import { FilePayload } from '../utils/file-helper';

/**
 * Page Object Model for the File Uploader page.
 * https://the-internet.herokuapp.com/upload
 *
 * Encapsulates all locators and reusable actions so that spec files
 * contain zero raw selectors and minimal boilerplate.
 */
export class UploadPage {
  readonly page: Page;

  // ── Locators ──────────────────────────────────────────────────────────────
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly dragDropZone: Locator;
  readonly pageHeading: Locator;
  readonly successHeading: Locator;
  readonly uploadedFileName: Locator;
  readonly instructionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput     = page.locator('#file-upload');
    this.uploadButton  = page.locator('#file-submit');
    this.dragDropZone  = page.locator('#drag-drop-upload');
    this.pageHeading   = page.getByRole('heading', { name: PAGE_TEXTS.heading });
    this.successHeading = page.getByRole('heading', { name: PAGE_TEXTS.successHeading });
    this.uploadedFileName = page.locator('#uploaded-files');
    this.instructionText  = page.locator('p').filter({ hasText: 'Choose a file on your system' });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.page.goto(UPLOAD_URL);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Sets the file input value without opening the OS file picker.
   * Accepts a `FilePayload` produced by `createFilePayload()`.
   */
  async selectFile(payload: FilePayload): Promise<void> {
    await this.fileInput.setInputFiles({
      name: payload.name,
      mimeType: payload.mimeType,
      buffer: payload.buffer,
    });
  }

  async clickUpload(): Promise<void> {
    await this.uploadButton.click();
  }

  /**
   * Convenience: select a file and immediately click Upload.
   */
  async uploadFile(payload: FilePayload): Promise<void> {
    await this.selectFile(payload);
    await this.clickUpload();
  }

  /**
   * Simulates a drag-and-drop by programmatically setting `input.files`
   * via a DataTransfer object and dispatching a `change` event.
   * The file is passed as a base64-encoded buffer to keep the payload
   * serialisable across the evaluate boundary.
   */
  async dragAndDropFile(payload: FilePayload): Promise<void> {
    await this.page.evaluate(
      ({
        name,
        mimeType,
        base64Data,
      }: {
        name: string;
        mimeType: string;
        base64Data: string;
      }) => {
        const byteArray = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const file = new File([byteArray], name, { type: mimeType });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        const input = document.querySelector('#file-upload') as HTMLInputElement;
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      },
      {
        name: payload.name,
        mimeType: payload.mimeType,
        base64Data: payload.buffer.toString('base64'),
      },
    );
  }

  // ── Attribute helpers ─────────────────────────────────────────────────────

  async getFileInputMultiple(): Promise<boolean> {
    return this.fileInput.evaluate((el: HTMLInputElement) => el.multiple);
  }

  async getFileInputAccept(): Promise<string> {
    return this.fileInput.evaluate((el: HTMLInputElement) => el.accept);
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /**
   * Asserts that the upload form is fully rendered and interactive.
   * Call this after `goto()` as a standard page-ready check.
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(PAGE_TEXTS.title);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.instructionText).toBeVisible();
    await expect(this.fileInput).toBeVisible();
    await expect(this.fileInput).toBeEnabled();
    await expect(this.uploadButton).toBeVisible();
    await expect(this.uploadButton).toBeEnabled();
  }

  /**
   * Asserts the success state after a file has been uploaded.
   *
   * @param expectedFileName - Exact file name that should appear in `#uploaded-files`.
   */
  async assertUploadSuccess(expectedFileName: string): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    await expect(this.uploadedFileName).toHaveText(expectedFileName);
  }
}
