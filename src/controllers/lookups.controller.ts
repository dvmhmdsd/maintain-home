import express from "express";
import { LookupsService } from "../business-logic-layer/lookups.service";

class LookupsController {
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
