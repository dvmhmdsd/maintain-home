import CoreService from "../core.service";
import Device from "../../data-access-layer/order/device.model";
import { IDevice } from "./../../CONSTANTS/interfaces/device.interface";

export default class DeviceService extends CoreService<IDevice> {
  constructor() {
    super();
    this.initialize(Device, "Device");
  }
}
