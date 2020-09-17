import { ISettings } from "./../../CONSTANTS/interfaces/settings.interface";
import { Request, Response } from "express";
import { Readable } from "stream";
import Settings from "../../data-access-layer/settings/settings.model";
import { ErrorHandler } from "../../helpers/error/error-handler.helper";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

export class SettingsService {
  private _db = Settings;
  constructor() {
    this.addImage = this.addImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }

  uploadVideo(req: any, res: Response, next: any) {
    upload.single("video")(req, res, () => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { folder: "application", resource_type: "video" },
        async (err: any, video: any) => {
          if (err) {
            new ErrorHandler(err.http_code, err.message);
          }
          if (video) {
            let updatedRecord = await this._db.findOneAndUpdate(
              {},
              { $set: { videoUrl: video.secure_url } },
              { new: true }
            );
            if (!updatedRecord) {
              await this._db.create({ video: video.secure_url });
            }
            res.json({ video: video.secure_url });
          } else res.sendStatus(500);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });
  }

  async getImages(req: Request, res: Response, next: any) {
    try {
      let images = await this._db.findOne({}, "images");
      res.json(images);
    } catch (error) {
      next(error);
    }
  }

  async addImage(req: any, res: Response, next: any) {
    try {
      let { public_id, secure_url } = req.file;
      let imageObject = {
        _id: public_id,
        url: secure_url,
      };

      let updatedRecord = await this._db.findOneAndUpdate(
        {},
        { $push: { images: imageObject } }
      );
      if (!updatedRecord) {
        await this._db.create({ images: [imageObject] });
      }
      res.json({ image: imageObject });
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req: Request, res: Response, next: any) {
    let { publicId } = req.params;

    try {
      await cloudinary.uploader.destroy(`application/${publicId}`);
      await this._db.findOneAndUpdate(
        {},
        { $pull: { images: { _id: `application/${publicId}` } } }
      );
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async getVideo(req: Request, res: Response, next: any) {
    try {
      let video = await Settings.findOne({}, "videoUrl");
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
}
