import moment from "moment";

class ValidatorDefault {
    setError(erros: Array<any>){
        if(erros.length>0){
            console.log(erros)
            throw  {
                message: erros.length+" Erros encontrados",
                erros
            }
        }
    }

    async isNaN(n:number,campo?: string){
        let erros = []

        if(campo){
            if(isNaN(n)){
                erros.push({name:campo,error: `${campo} deve ser um número`})
            }
        }else{
            if(isNaN(n)){
                erros.push({error: `Um número era esperado, porem uma string foi recebida`})
            }
        }

        this.setError(erros)       
    }

    async arrumaDataBr(data: string){     
        let erros = []

        let dt = data.split("/")
        if(dt.length ==3){
            var dtBd = moment(dt[0]+"-"+dt[1]+"-"+dt[2]).format("YYYY-MM-DD")
            return dtBd
        }else{
            erros.push({name:"data",error:'Data inválida.'})
        }

        this.setError(erros)
    }

    async dataFutura(data: any){
        let erros = []

        var dataAtual = moment().format('YYYY-MM-DD HH:mm:ss');
        data = moment(data).format('YYYY-MM-DD HH:mm:ss');
        if(dataAtual < data) erros.push({name:"data",error:'Data inform,ada é maior que a data atual.'})

        this.setError(erros)
    }

    async cpfValido(cpf: string){
        let erros = []

        var Soma;
        var Resto;
        Soma = 0;
      if (cpf == "00000000000") return false;
    
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11) ) ) erros.push({name:"cpg",error:'CPF inválido'})

        this.setError(erros)
    }

    async emailValido(email:string) {
        let erros = []
        if(email.indexOf('@')== -1 || email.indexOf('.')== -1 ){
	        erros.push({name:"email",error:'Email inválido'})     
        }

        this.setError(erros)
        
    }

    async forcaSenha(senha: string){
        let erros = []

        var numeros = /([0-9])/;
        var alfabeto = /([A-Z])/;
        var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    
        if(senha.length<6)  erros.push({name:"senha",error:'A senha deve ter no mínimo 6 digitos'})
        
        if(!senha.match(numeros))  erros.push({name:"senha",error:'A senha deve ter pelo menos 1 número'})

        if(!senha.match(alfabeto))  erros.push({name:"senha",error:'A senha deve ter pelo menos uma letra maiúscula'})

        if(!senha.match(chEspeciais))  erros.push({name:"senha",error:'A senha deve ter pelo menos um caractere especial'})

        this.setError(erros)

    }   
}

export default new ValidatorDefault();