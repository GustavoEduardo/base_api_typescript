
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { Config } from '../../config/config';
export default (
  req: any,
  res: Response,
  next: NextFunction,
) => {
    
    let retorno = {
        status:"success",
        message:"Ação realizada com sucesso",
        code: 200
    };
    
    try {

        //validar se existe authorization no header
        const authHeader = req.headers.authorization;
    
        if( !authHeader ) throw 'Acesso não autorizado (code 1)';

        //validar se há 2 partes authorization
        const parts = authHeader.split(' ');
        if( parts.length < 2 ) throw 'Acesso não autorizado (code 2)';

         (req.headers.authorization);

        //validar schema do authorization "Bearer"
        const [scheme, token] = parts;
        if( !/^Bearer$/i.test(scheme) ) throw 'Sessão expirada'

        if (!token) throw 'Sessão expirada';


         if( Config.jwtSecret){
           jwt.verify(token, Config.jwtSecret, function(err: any, decoded: any) {
             if (err) throw 'Sessão expirada';          
          
             if(decoded && decoded.id_usuario) req.id_usuario = decoded.id_usuario;
           
           })
         }      

    } catch (e: any) {
        retorno.message = e;
        retorno.code = 401;
        retorno.status = "error";

        res.status(401).json(retorno);
        return;
    }
    next();
    return;
};
