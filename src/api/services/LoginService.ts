import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';
import ILogin from '../../types/ILogin';
import LoginRepositories from '../repositories/LoginRepositories';
import LoginValidator from '../validators/LoginValidator';
import { Config } from '../../config/config';
import jwt from 'jsonwebtoken';


class LoginService {
    
    async login(data: ILogin){
        try{
            await LoginValidator.login(data);

            let usuario: any = await LoginRepositories.login(data);
            
            if(usuario){
                var dados: any = {id: usuario[0].id, nome: usuario[0].nome, email: usuario[0].email}//tirar senha
            }
            
            if(dados && Config.jwtSecret){
                SuccessReturn.result = await jwt.sign(dados, Config.jwtSecret, {
                    expiresIn: 7200 // expires in 2hrs
                });
            }else{
                throw 'Usuario ou senha invalidos'
            }

        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }

        return SuccessReturn;
    }  

}

export default new LoginService();