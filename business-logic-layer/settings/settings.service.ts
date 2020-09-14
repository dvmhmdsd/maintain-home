import { Request, Response } from "express";
import Settings from "../../data-access-layer/settings/settings.model";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require("cloudinary").v2;

export class SettingsService {
  constructor() {
    this.addImages = this.addImages.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.uploadAssets = this.uploadAssets.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }

  async uploadAssets(req: any, res: Response, next: any) {
    try {
      let { assetType } = req.body;
      if (assetType === "image") {
        this.addImages(req.files, res);
      } else {
        this.uploadVideo(req, res);
      }
    } catch (error) {
      next(error);
    }
  }

  private async addImages(images: any, res: Response) {
    let imagesUrls = images.map((image: any) => image.secure_url);
    let settingsItem = await Settings.findOne({});
    console.log(settingsItem);
    let imagesItems;
    if (!settingsItem) {
      imagesItems = await Settings.create({
        assetType: "image",
        images: imagesUrls,
      });
    } else {
      imagesItems = await Settings.findOneAndUpdate(
        { assetType: "image" },
        { images: imagesUrls }
      );
    }
    res.json(imagesItems);
  }

  private uploadVideo(req: any, res: Response) {
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
        { resource_type: "auto" },
        (image: any) => {
          console.log(image);
        }
      );
    });
  }

  async getImages(req: Request, res: Response, next: any) {
    try {
      let images = await Settings.findOne({}, "images");
      res.json(images);
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
