import ILogin from '../../types/ILogin';
import LoginRepositories from '../repositories/LoginRepositories';
import LoginValidator from '../validators/LoginValidator';
import { Config } from '../../config/config';
import jwt from 'jsonwebtoken';
import BaseRepositories from '../repositories/BaseRepositories';


class LoginService {
    
    async login(data: ILogin){
        
        await LoginValidator.login(data);

        //let usuario: any = await LoginRepositories.login(data);
        let br = new BaseRepositories()
        let usuario: any = await br.get("admin",{data})
   
        if(usuario){
            var dados: any = {id: usuario[0].id_usuario}
        }
        
        if(dados && Config.jwtSecret){
            let retorno = jwt.sign(dados, Config.jwtSecret, {
                expiresIn: 28000
            });

            return retorno
        }else{
            throw {message:'Usuario ou senha invalidos'}
        }

    }  

}

export default new LoginService();