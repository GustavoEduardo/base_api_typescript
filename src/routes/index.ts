import { Router } from "express";
import { Request, Response } from "express";
import LoginRoutes from "./Login.routes";
import auth from "../api/middlewares/auth";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ status: "true" });
  return
});

routes.get("/teste-auth", auth, async (req: Request, res: Response) => {
  res.status(200).json({ status: "true" });
  return 
});

routes.use(LoginRoutes);

export default routes;
