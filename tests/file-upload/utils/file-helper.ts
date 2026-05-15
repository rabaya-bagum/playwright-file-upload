import { FileConfig } from '../data/test-data';

export type FilePayload = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

/**
 * Creates a Playwright-compatible file payload object from a FileConfig.
 * Pass the returned object directly to `page.setInputFiles()` or
 * `UploadPage.selectFile()`.
 */
export function createFilePayload(config: FileConfig): FilePayload {
  return {
    name: config.name,
    mimeType: config.mimeType,
    buffer: config.contentGenerator(),
  };
}

/**
 * Creates a large in-memory file payload of the given size.
 * Useful for testing upload behaviour with big files without needing
 * a file on disk.
 *
 * @param sizeInBytes - Size of the file in bytes.
 * @param name        - Optional file name (defaults to 'large-file.bin').
 */
export function createLargeFilePayload(
  sizeInBytes: number,
  name = 'large-file.bin',
): FilePayload {
  return {
    name,
    mimeType: 'application/octet-stream',
    buffer: Buffer.alloc(sizeInBytes),
  };
}
