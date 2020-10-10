import express, { Request, Response } from "express";
import multer from "multer";
// @ts-ignore
import streamifier from "streamifier";
import Settings from "../../data-access-layer/settings/settings.model";
import { ErrorHandler } from "../../helpers/error/error-handler.helper";

const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require("cloudinary").v2;

export class SettingsService {
  private _db = Settings;
  constructor() {
    this.addImage = this.addImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }

  uploadVideo(req: any, res: Response, next: express.NextFunction) {
    upload.single("video")(req, res, () => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const cldUploadStream = cloudinary.uploader.upload_stream(
        { folder: "application", resource_type: "video" },
        async (err: any, video: any) => {
          if (err) {
            throw new ErrorHandler(err.http_code, err.message);
          }
          if (video) {
            const updatedRecord = await this._db.findOneAndUpdate(
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
      streamifier.createReadStream(req.file.buffer).pipe(cldUploadStream);
    });
  }

  async getImages(req: Request, res: Response, next: express.NextFunction) {
    try {
      const images = await this._db.findOne({}, "images");
      res.json(images);
    } catch (error) {
      next(error);
    }
  }

  async addImage(req: any, res: Response, next: any) {
    try {
      const { public_id, secure_url } = req.file;
      const imageObject = {
        _id: public_id,
        url: secure_url,
      };

      const updatedRecord = await this._db.findOneAndUpdate(
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

  async deleteImage(req: Request, res: Response, next: express.NextFunction) {
    const { publicId } = req.params;

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

  async getVideo(req: Request, res: Response, next: express.NextFunction) {
    try {
      const video = await Settings.findOne({}, "videoUrl");
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
}
