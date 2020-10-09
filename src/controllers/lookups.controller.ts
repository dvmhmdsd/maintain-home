import express from "express";
import verifyToken from "../helpers/token/verify-token.helper";
import { LookupsService } from "../business-logic-layer/lookups.service";

const server = express.Router();
const lookupsService = new LookupsService();

server.get("/", lookupsService.getHomeLookups);

export default server;
