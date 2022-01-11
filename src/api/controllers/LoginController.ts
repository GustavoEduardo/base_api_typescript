import {  Request, Response } from 'express';
import LoginService from '../services/LoginService';
import ILogin from '../../types/ILogin';

class LoginController{

    async login(req:Request,res:Response){
        let login = req.body;
        let retorno = await LoginService.login(login);
    
        return res.status(retorno.code).json(retorno);
    }

}

export default new LoginController();