
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
export default (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    
    let retorno  = {
        status:"success",
        message:"Ação realizada com sucesso",
        code: 200,
        data: {}
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
        if( !/^Bearer$/i.test(scheme) ) throw 'token invalido'

        if (!token) throw 'Token Invalido';


        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err) throw 'Token Invalido';
        
          // se tudo estiver ok, salva no request para uso posterior
          req.userId = decoded.login;

         
        });
        
        

    }catch ( e) {
        retorno.message = e;
        retorno.code = 200;
        retorno.status = "error";

        return res.status(200).json(retorno);
    }
    return next();
};
