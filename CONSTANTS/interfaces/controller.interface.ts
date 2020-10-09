import { Router } from "express";

export interface IController {
  initRoutes: () => void;
  server: Router;
}
