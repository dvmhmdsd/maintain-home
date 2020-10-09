import express from "express";
import verifyToken from "../../helpers/token/verify-token.helper";
import DeviceService from "../../business-logic-layer/order/device.service";

class DeviceController {
  public server = express.Router();
  private deviceService = new DeviceService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.server.get("/list", this.deviceService.listRecords);
    this.server.post("/new", verifyToken, this.deviceService.createRecord);
    this.server.delete("/:id", verifyToken, this.deviceService.deleteRecord);
  }
}

const deviceController = new DeviceController();
export default deviceController.server;
