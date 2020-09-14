import { Request, Response } from "express";
import Settings from "../../data-access-layer/settings/settings.model";

const multer = require("multer");
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

  uploadVideo(req: any, res: Response, next: any) {
    upload.single("video")(req, res, () => {
      console.log(req.file);
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const path = req.file.path;

      cloudinary.uploader.upload(
        path,
        { resource_type: "video" },
        (image: any) => {
          console.log(image);
        }
      );
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
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async getVideo(req: Request, res: Response, next: any) {
    try {
      let video = await Settings.findOne({}, "video");
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
}
