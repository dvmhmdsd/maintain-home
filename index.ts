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

// const fileUpload = require('express-fileupload');

class App {
  private app = express();
  private endpoints = [
    { endpointUrl: "/api/users", controller: userController },
    { endpointUrl: "/api/orders", controller: orderController },
    { endpointUrl: "/api/devices", controller: deviceController },
    { endpointUrl: "/api/complaints", controller: complaintController },
    { endpointUrl: "/api/feedbacks", controller: feedbackController },
    { endpointUrl: "/api/lookups", controller: lookupsController },
    { endpointUrl: "/api/assets", controller: settingsController },
  ];

  constructor() {
    this.setupDbConnection();
    this.init();
  }

  private init() {
    this.app.use(express.json());
    this.app.use(cors());

    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static(path.join(__dirname, "public")));

      // always send the index.html file to handle SPA routing
      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
      });
    }

    this.registerControllers();
    this.app.use((err: any, req: Request, res: Response, next: any) => {
      handleError(err, res);
    });
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
    this.endpoints.map((endpoint) =>
      this.app.use(endpoint.endpointUrl, endpoint.controller)
    );
  }

  listen() {
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => console.log(`Listening to port ${port}`));
  }
}

const server = new App();
server.listen();
