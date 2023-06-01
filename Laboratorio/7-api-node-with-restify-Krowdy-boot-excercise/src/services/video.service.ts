import { spawn } from "child_process";

import { consoleColors, inputAndOutputPath } from "../utilities";

class VideoService {
  /**
   * Convert a video format from .webm to .mp4.
   * @param {string} fileName - The name of the video file to be converted.
   * @returns {Promise<object>} - The promise resolves with the conversion result, otherwise rejected.
   */
  convertFromWebmToMp4(fileName: string) {
    return new Promise((resolve, reject) => {
      if (!fileName.includes(".webm")) throw new Error("The format must be .webm");

      const { inputFilePath, newName, outputFilePath } = inputAndOutputPath(fileName, "mp4", "withConvert");

      const ffmpeg = spawn("ffmpeg", ["-i", inputFilePath, "-c:v", "libx264", "-profile:v", "high", "-c:a", "copy", "-strict", "-2", outputFilePath]);

      ffmpeg.stderr.on("data", (data) => {
        console.log(consoleColors.redColor, `stderr: ${data}`);
      });

      ffmpeg.on("close", (code) => {
        if (code === 0)
          resolve({
            status: "success",
            message: "",
            name: newName,
            codeMessage: code,
            outputFilePath,
          });
        else reject(new Error(`Video conversion failed with code ${code}`));
      });
    });
  }

  /**
   * Convert a video format from .mp4 to .webm.
   * @param {string} fileName - The name of the video file to be converted.
   * @returns {Promise<object>} - The promise resolves with the conversion result, otherwise rejected.
   */
  convertFromMp4ToWebm(fileName: string) {
    return new Promise((resolve, reject) => {
      if (!fileName.includes(".mp4")) throw new Error("The format must be .mp4");

      const { inputFilePath, newName, outputFilePath } = inputAndOutputPath(fileName, "webm", "withConvert");

      const ffmpeg = spawn("ffmpeg", ["-i", inputFilePath, "-c:v", "libvpx", "-c:a", "libvorbis", "-b:v", "1M", "-b:a", "128k", outputFilePath]);

      ffmpeg.stderr.on("data", (data) => {
        console.log(consoleColors.redColor, `stderr: ${data}`);
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) resolve({ status: "success", message: "", name: newName, codeMessage: code, outputFilePath });
        else reject(new Error(`Video conversion failed with code ${code}`));
      });
    });
  }

  /**
   * Copy the video with the same format but remove the sound it.
   * @param {string} fileName - The name of the video file to be converted.
   * @returns {Promise<object>}  - The promise that resolves with the conversion result, otherwise rejected.
   */
  videoWithoutSound(fileName: string) {
    return new Promise((resolve, reject) => {
      const { inputFilePath, newName, outputFilePath } = inputAndOutputPath(fileName, fileName.split(".")[1]);

      const ffmpeg = spawn("ffmpeg", ["-i", inputFilePath, "-c:v", "copy", "-an", outputFilePath]);

      ffmpeg.stderr.on("data", (data) => {
        console.log(consoleColors.redColor, `stderr: ${data}`);
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) resolve({ status: "success", message: "", name: newName, codeMessage: code, outputFilePath });
        else reject(new Error(`Video conversion failed with code ${code}`));
      });
    });
  }
}

export default new VideoService();
