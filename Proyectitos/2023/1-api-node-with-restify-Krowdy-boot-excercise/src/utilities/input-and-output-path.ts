import { resolve as resolvePath } from "path";

type ParsedNewName = {
  [key: string]: (fileName: string, outputExtension: string) => string;
};

const parsedNewName: ParsedNewName = {
  withConvert: (fileName: string, outputExtension: string) => `new-${fileName.split(".")[0]}.${outputExtension}`,
};

/**
 * Generate input and output paths for the file conversion.
 * @param {string} fileName - The file name.
 * @param {string} outputExtension - The output file extension.
 * @param {string | undefined} withVideoConversion - The option to enable video conversion.
 *  - withConvert or undefined. If it's undefined the video will have the same format but without sound.
 * @returns {object} - Object with input and output paths, and new name of file saved
 */
export const inputAndOutputPath = (fileName: string, outputExtension: string, withVideoConversion?: string) => {
  let newName;

  const inputFilePath = resolvePath(__dirname, "..", "files", fileName);

  if (withVideoConversion && parsedNewName[withVideoConversion]) newName = parsedNewName[withVideoConversion](fileName, outputExtension);
  else newName = `without-sound-${fileName.split(".")[0]}.${fileName.split(".")[1]}`;

  const outputFilePath = resolvePath(__dirname, "..", "files-copy", newName);

  return { inputFilePath, newName, outputFilePath };
};
