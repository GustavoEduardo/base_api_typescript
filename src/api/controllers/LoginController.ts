import {  Request, Response } from 'express';
import LoginService from '../services/LoginService';
import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';

class LoginController{

    async login(req:Request,res:Response){
        try {
            let data = req.body;
            SuccessReturn.result = await LoginService.login(data);
    
            return res.status(SuccessReturn.code).json(SuccessReturn.result);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

}

export default new LoginController();