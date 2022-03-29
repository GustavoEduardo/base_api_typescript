
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../helpers/upload'
const upload = multer(uploadConfig);
import {Config} from '../config/config'
import Controller from '../api/controllers/LoginController';

const routes = Router();
//routes.post('/login', Controller.login);

routes.post('/upload', upload.single('file'), (req, res) => {
    const originalFileName = req.file?req.file.originalname:"semnome";
    return res.json({location: '/uploads/'+req.query.pasta+'/'+originalFileName, url: Config.url+'/uploads/'+req.query.pasta+'/'+originalFileName, file:originalFileName});
});



export default routes;