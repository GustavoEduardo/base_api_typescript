import validator from 'validator';
import ILogin from '../../types/ILogin';

class LoginValidator {

    setError(message: string){
        throw  message;
    }

    async login(data:ILogin){            
        if(validator.isEmpty(data.email)){
            this.setError('Email é Obrigatório')
        }
        if(validator.isEmpty(data.senha)){
            this.setError('Senha é Obrigatória')
        }
        return data;
    }

}

export default new LoginValidator();