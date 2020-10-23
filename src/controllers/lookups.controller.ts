import express from "express";
import { IController } from "../../CONSTANTS/interfaces/controller.interface";
import { LookupsService } from "../business-logic-layer/lookups.service";

class LookupsController implements IController {
  public server = express.Router();
  private lookupsService = new LookupsService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/", this.lookupsService.getHomeLookups);
  }
}

const lookupsController = new LookupsController();
export default lookupsController.server;
