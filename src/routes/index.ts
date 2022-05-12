import { Router } from 'express';
import Upload from './Upload.routes'
import LoginRoutes from './Login.routes';
import UsuarioRoutes from './Usuario.routes';

const routes = Router();

routes.use(Upload);
routes.use(LoginRoutes);
routes.use(UsuarioRoutes);

export default routes;

