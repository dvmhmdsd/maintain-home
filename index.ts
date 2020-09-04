import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userController } from "./controllers";
import { handleError } from "./helpers/error/error-handler.helper";

class App {
  private app = express();
  private endpoints = [
    { endpointUrl: "/api/users", controller: userController },
  ];

  constructor() {
    dotenv.config();
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
