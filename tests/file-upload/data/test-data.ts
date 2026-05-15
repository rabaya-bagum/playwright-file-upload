// Test data for File Upload tests
// https://the-internet.herokuapp.com/upload

export const UPLOAD_URL = 'https://the-internet.herokuapp.com/upload';

export const PAGE_TEXTS = {
  title: 'The Internet',
  heading: 'File Uploader',
  instruction:
    'Choose a file on your system and then click upload. Or, drag and drop a file into the area below.',
  successHeading: 'File Uploaded!',
  uploadButtonLabel: 'Upload',
  errorHeading: 'Internal Server Error',
} as const;

export type FileConfig = {
  name: string;
  mimeType: string;
  contentGenerator: () => Buffer;
};

export const FILE_CONFIGS = {
  text: {
    name: 'test.txt',
    mimeType: 'text/plain',
    contentGenerator: () => Buffer.from('Hello, Playwright!'),
  },
  jpeg: {
    name: 'test.jpg',
    mimeType: 'image/jpeg',
    // Minimal JPEG header (magic bytes)
    contentGenerator: () =>
      Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]),
  },
  png: {
    name: 'test.png',
    mimeType: 'image/png',
    // Minimal PNG header (magic bytes)
    contentGenerator: () =>
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  pdf: {
    name: 'test.pdf',
    mimeType: 'application/pdf',
    contentGenerator: () => Buffer.from('%PDF-1.4\n%Test PDF content'),
  },
  xml: {
    name: 'test.xml',
    mimeType: 'application/xml',
    contentGenerator: () =>
      Buffer.from('<?xml version="1.0" encoding="UTF-8"?><root><item>test</item></root>'),
  },
  csv: {
    name: 'test.csv',
    mimeType: 'text/csv',
    contentGenerator: () => Buffer.from('name,value\nfoo,bar\nbaz,qux'),
  },
  zip: {
    name: 'test.zip',
    mimeType: 'application/zip',
    // Minimal ZIP local file header (magic bytes)
    contentGenerator: () => Buffer.from([0x50, 0x4b, 0x03, 0x04]),
  },
  empty: {
    name: 'empty.txt',
    mimeType: 'text/plain',
    contentGenerator: () => Buffer.alloc(0),
  },
  longName: {
    // 247 a's + '.txt' = 251 chars — safe for most file systems
    name: `${'a'.repeat(247)}.txt`,
    mimeType: 'text/plain',
    contentGenerator: () => Buffer.from('File with a very long name'),
  },
  specialChars: {
    name: 'my file (1).txt',
    mimeType: 'text/plain',
    contentGenerator: () => Buffer.from('File with special characters in name'),
  },
} satisfies Record<string, FileConfig>;

/**
 * Parameterised cases used in the upload-file-types spec.
 * Each entry is [human-readable label, FileConfig].
 */
export const UPLOAD_FILE_TYPE_CASES: [string, FileConfig][] = [
  ['plain text (.txt)', FILE_CONFIGS.text],
  ['JPEG image (.jpg)', FILE_CONFIGS.jpeg],
  ['PNG image (.png)', FILE_CONFIGS.png],
  ['PDF document (.pdf)', FILE_CONFIGS.pdf],
  ['XML file (.xml)', FILE_CONFIGS.xml],
  ['CSV file (.csv)', FILE_CONFIGS.csv],
  ['ZIP archive (.zip)', FILE_CONFIGS.zip],
];
