import ILogin from '../../types/ILogin';

class LoginValidator {

    setError(erros: Array<any>){
        if(erros.length>0){
            console.log(erros)
            throw  {
                message: erros.length+" Erros encontrados",
                erros
            }
        }
    }

    async login(data:ILogin){
        let erros = []       
        if(!data.email || data.email == "" || data.email == ''){
            erros.push({name:"email",error:'Email é Obrigatório'})
        }
        if(!data.senha || data.senha == "" || data.senha == ''){
            erros.push({name:"senha",error:'Senha é Obrigatória'})
        }
        this.setError(erros)
        return data;
    }

}

export default new LoginValidator();