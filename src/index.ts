import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import {
  complaintController,
  deviceController,
  feedbackController,
  lookupsController,
  orderController,
  settingsController,
  userController,
} from "./controllers";
import { handleError } from "./helpers/error/error-handler.helper";
import dotenv from "dotenv";

class App {
  private app = express();
  private modules = [
    { url: "/api/users", controller: userController },
    { url: "/api/orders", controller: orderController },
    { url: "/api/devices", controller: deviceController },
    { url: "/api/complaints", controller: complaintController },
    { url: "/api/feedbacks", controller: feedbackController },
    { url: "/api/lookups", controller: lookupsController },
    { url: "/api/assets", controller: settingsController },
  ];

  constructor() {
    dotenv.config();
    this.setupDbConnection();
    this.init();
  }

  private initMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initProdMiddleWares() {
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static(path.join(__dirname, "public")));

      // always send the index.html file to handle SPA routing
      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
      });
    }
  }

  private init() {
    this.initMiddleWares();
    this.registerControllers();
    this.app.use(
      (err: any, req: Request, res: Response, next: express.NextFunction) => {
        handleError(err, res);
      }
    );
    this.initProdMiddleWares();
    // disable the X-Powered-By header instead of using helmet
    this.app.disable("x-powered-by");
  }

  private async setupDbConnection() {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  }

  private registerControllers() {
    this.modules.map((module) => this.app.use(module.url, module.controller));
  }

  listen() {
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => console.log(`Listening to port ${port}`));
  }
}

const server = new App();
server.listen();
