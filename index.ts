import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import { userController } from "./controllers";

require("dotenv").config();

class App {
  private app = express();
  private endpoints = [
    { endpointUrl: "/api/users", controller: userController },
  ];

  constructor() {
    this.setupDbConnection();
    this.app.use(express.json());
    this.app.use(cors());

    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static(path.join(__dirname, "public")));

      // always send the index.html file to handle SPA routing
      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
      });
    }

    // disable the X-Powered-By header instead of using helmet
    this.app.disable("x-powered-by");

    this.registerControllers();
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
