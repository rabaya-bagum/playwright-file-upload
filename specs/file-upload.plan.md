# File Upload Test Plan

## Application Overview

Test plan for the File Uploader feature at https://the-internet.herokuapp.com/upload. The page presents a "Choose File" button and an "Upload" button. The form submits via POST multipart/form-data with no file type restrictions and no multiple-file support. A successful upload shows "File Uploaded!" and the filename. Submitting without a file results in an Internal Server Error.

## Test Scenarios

### 1. File Upload

**Seed:** `tests/seed.spec.ts`

#### 1.1. Should display the upload form correctly on page load

**File:** `tests/file-upload/page-load.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Page title is 'The Internet'
    - expect: Heading 'File Uploader' is visible
    - expect: Instruction text 'Choose a file on your system and then click upload. Or, drag and drop a file into the area below.' is visible
    - expect: 'Choose File' button is visible and enabled
    - expect: 'Upload' button is visible and enabled

#### 1.2. Should successfully upload a plain text file

**File:** `tests/file-upload/upload-text-file.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded with 'Choose File' and 'Upload' buttons
  2. Click the 'Choose File' button and select a .txt file (e.g., test.txt)
    - expect: The file name 'test.txt' appears next to the 'Choose File' button
  3. Click the 'Upload' button
    - expect: Page redirects or updates to show a success state
    - expect: Heading 'File Uploaded!' is visible
    - expect: The uploaded file name 'test.txt' is displayed on the page

#### 1.3. Should successfully upload an image file (JPEG)

**File:** `tests/file-upload/upload-image-jpeg.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a .jpg image file
    - expect: The selected JPEG file name appears next to the 'Choose File' button
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The uploaded JPEG file name is displayed on the page

#### 1.4. Should successfully upload a PNG image file

**File:** `tests/file-upload/upload-image-png.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a .png image file
    - expect: The selected PNG file name appears next to the 'Choose File' button
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The uploaded PNG file name is displayed on the page

#### 1.5. Should successfully upload a PDF file

**File:** `tests/file-upload/upload-pdf.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a .pdf file
    - expect: The selected PDF file name appears next to the 'Choose File' button
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The uploaded PDF file name is displayed on the page

#### 1.6. Should return an error when uploading with no file selected

**File:** `tests/file-upload/upload-no-file.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded with 'Choose File' showing no file selected
  2. Click the 'Upload' button without selecting any file
    - expect: An error response or error message is shown
    - expect: The page does NOT show 'File Uploaded!'

#### 1.7. Should upload a file with a very long file name

**File:** `tests/file-upload/upload-long-filename.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a file whose name is 255 characters long (e.g., a string of 'a' characters with .txt extension)
    - expect: The file is accepted by the file picker without error
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The long file name is displayed on the page

#### 1.8. Should upload a zero-byte (empty) file

**File:** `tests/file-upload/upload-empty-file.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a file with 0 bytes of content
    - expect: The empty file is selected and its name is shown
  3. Click the 'Upload' button
    - expect: Either 'File Uploaded!' is shown with the file name, or an appropriate error message is displayed
    - expect: The application does not crash or show an unhandled error

#### 1.9. Should upload a large file

**File:** `tests/file-upload/upload-large-file.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a large file (e.g., 10 MB or more)
    - expect: The large file is accepted by the file picker
  3. Click the 'Upload' button and wait for the response
    - expect: Either 'File Uploaded!' is shown with the file name, or an appropriate file size error is displayed
    - expect: The page does not hang indefinitely or crash

#### 1.10. Should upload a file with special characters in the file name

**File:** `tests/file-upload/upload-special-chars-filename.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Click the 'Choose File' button and select a file whose name contains special characters such as spaces, hyphens, underscores, and parentheses (e.g., 'my file (1).txt')
    - expect: The file is accepted by the file picker
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The file name with special characters is displayed correctly on the page

#### 1.11. Should upload a file via drag and drop

**File:** `tests/file-upload/upload-drag-drop.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded with the drop area visible
  2. Drag a file from the local filesystem and drop it onto the designated drop area on the page
    - expect: The dropped file name is reflected in the file input or on the page
  3. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The dragged-and-dropped file name is displayed on the page

#### 1.12. Should not allow selecting multiple files simultaneously

**File:** `tests/file-upload/upload-single-file-only.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Inspect the file input element to verify that the 'multiple' attribute is NOT present
    - expect: The file input does not have the 'multiple' attribute, confirming only one file can be selected at a time
  3. Attempt to select multiple files in the file picker
    - expect: Only one file is accepted; the file picker does not allow multi-selection

#### 1.13. Should accept files of any type (no type restriction)

**File:** `tests/file-upload/upload-any-file-type.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/upload
    - expect: Upload page is loaded
  2. Inspect the file input element to confirm the 'accept' attribute is empty or absent
    - expect: The 'accept' attribute is empty, meaning no file type restriction is enforced client-side
  3. Click the 'Choose File' button and select an unconventional file type (e.g., .xml, .csv, or .zip)
    - expect: The file is accepted by the file picker without any browser-level restriction
  4. Click the 'Upload' button
    - expect: Heading 'File Uploaded!' is visible
    - expect: The file name is displayed on the page


tests/file-upload/
├── data/
│   └── test-data.ts          ← URLs, page text constants, FileConfig definitions, parameterised cases
├── utils/
│   └── file-helper.ts        ← createFilePayload(), createLargeFilePayload()
├── page-objects/
│   └── UploadPage.ts         ← Full POM: all locators, actions, assertions
├── page-load.spec.ts          ← 1 test: UI elements on load
├── upload-file-types.spec.ts  ← 7 tests (loop): txt, jpg, png, pdf, xml, csv, zip
├── upload-no-file.spec.ts     ← 1 test: submit without file → error
├── upload-edge-cases.spec.ts  ← 4 tests: long name, empty, large (10MB), special chars
├── upload-drag-drop.spec.ts   ← 1 test: DataTransfer drag-drop simulation
└── upload-constraints.spec.ts ← 2 tests: no `multiple`, no `accept` restriction