
import { Router } from 'express';
import Controller from '../api/controllers/UsuarioController'

const routes = Router();
routes.post('/usuario', Controller.create);
routes.get('/usuario', Controller.select);
routes.put('/usuario/:id', Controller.update);



export default routes;