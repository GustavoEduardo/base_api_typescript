import { Router } from 'express';
import LoginRoutes from './Login.routes';


const routes = Router();

routes.use(LoginRoutes);

export default routes;

