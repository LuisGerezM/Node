import { Request, Response } from "restify";

import { videoService } from "../services";

import { consoleColors } from "../utilities";

class VideoController {
  #videoService;

  constructor() {
    this.#videoService = videoService;
  }

  /**
   * Calls the convertFromMp4ToWebm method in videoService to perform the conversion from .webm to .mp4.
   * @param {Request} req - The request object.
   *    - Expects req.params.name to be the name of the video file.
   * @param {Response} res - The response object.
   * @returns {Promise<restify.Response | { message: string, error: boolean }>} The response with the conversion result.
   *    - If the conversion is successful, it returns a `restify.Response` object.
   *    - If there is an error, it returns an object with the properties `message` and `error`.
   */
  async convertFromWebmToMp4(req: Request, res: Response) {
    try {
      const response = await this.#videoService.convertFromWebmToMp4(req?.params.name);
      return res.json(response);
    } catch (error) {
      console.log(consoleColors.redColor, (error as Error).stack);
      console.log(consoleColors.yellowColor, error);
      return res.json({
        message: error instanceof Error ? error.message : "Unknown error",
        error: true,
      });
    }
  }

  /**
   * Calls the convertFromMp4ToWebm method in videoService to perform the conversion from .mp4 to .webm.
   * @param {Request} req - The request object.
   *    - Expects req.params.name to be the name of the video file.
   * @param {Response} res - The response object.
   * @returns {Promise<restify.Response | { message: string, error: boolean }>} The response with the conversion result.
   *    - If the conversion is successful, it returns a `restify.Response` object.
   *    - If there is an error, it returns an object with the properties `message` and `error`.
   */
  async convertFromMp4ToWebm(req: Request, res: Response) {
    try {
      const response = await this.#videoService.convertFromMp4ToWebm(req?.params.name);
      return res.json(response);
    } catch (error) {
      console.log(consoleColors.redColor, (error as Error).stack);
      console.log(consoleColors.yellowColor, error);
      return res.json({
        message: error instanceof Error ? error.message : "Unknown error",
        error: true,
      });
    }
  }

  /**
   * Copy the video with the same format but remove the sound it..
   * @param {Request} req - The request object.
   *    - Expects req.params.name to be the name of the video file.
   * @param {Response} res - The response object.
   * @returns {Promise<restify.Response | { message: string, error: boolean }>} The response with the conversion result.
   *    - If the conversion is successful, it returns a `restify.Response` object.
   *    - If there is an error, it returns an object with the properties `message` and `error`.
   */
  async videoWithoutSound(req: Request, res: Response) {
    try {
      const response = await this.#videoService.videoWithoutSound(req?.params.name);
      return res.json(response);
    } catch (error) {
      console.log(consoleColors.redColor, (error as Error).stack);
      console.log(consoleColors.yellowColor, error);
      return res.json({
        message: error instanceof Error ? error.message : "Unknown error",
        error: true,
      });
    }
  }
}

export default new VideoController();
