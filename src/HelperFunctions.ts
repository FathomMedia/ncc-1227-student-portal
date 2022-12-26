/**
 * It checks if a file is too big
 * @param {File} [file] - The file that is being checked.
 * @returns A boolean value.
 */
export function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 1) {
      valid = false;
    }
  }
  return valid;
}
