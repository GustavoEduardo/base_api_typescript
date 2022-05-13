import {  Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';

class UsuarioController{

    async create(req:Request,res:Response){
        try {

            let data = req.body;
            SuccessReturn.result = await UsuarioService.create(data);
    
            return res.status(SuccessReturn.code).json(SuccessReturn);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

    async select(req:Request,res:Response){
        try {
            let filtros = req.query
            SuccessReturn.result = await UsuarioService.select(filtros);
    
            return res.status(SuccessReturn.code).json(SuccessReturn);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

    async update(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            let data = req.body
            SuccessReturn.result = await UsuarioService.update(data,id);
    
            return res.status(SuccessReturn.code).json(SuccessReturn);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

    async delete(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            SuccessReturn.result = await UsuarioService.delete(id);
    
            return res.status(SuccessReturn.code).json(SuccessReturn);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

    async getById(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            SuccessReturn.result = await UsuarioService.getById(id);
    
            return res.status(SuccessReturn.code).json(SuccessReturn);

        }catch ( e: any ) {
            ErrorReturn.message = e.message;
            ErrorReturn.result = e.erros;
            return ErrorReturn;
        }
    }

}

export default new UsuarioController();