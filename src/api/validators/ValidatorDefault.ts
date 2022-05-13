import moment from "moment";

class ValidatorDefault {

    async isNaN(n:number,campo?: string){
        if(campo){
            if(isNaN(n)){
                throw({message: `${campo} deve ser um número`})
            }
        }else{
            if(isNaN(n)){
                throw({message: "Um número era esperado, porem uma string foi recebida"})
            }
        }   
       
    }

    async arrumaDataBr(data: string){      
        let dt = data.split("/")
        if(dt.length ==3){
            var dtBd = moment(dt[0]+"-"+dt[1]+"-"+dt[2]).format("YYYY-MM-DD")
        }else{
            throw({name:"data",message: "A data informada é inválida"})
        }
        console.log(dtBd)
        return dtBd
    }

    async dataFutura(data: any){  
        var dataAtual = moment().format('YYYY-MM-DD HH:mm:ss');
        data = moment(data).format('YYYY-MM-DD HH:mm:ss');
        if(dataAtual < data){
            throw({name:"data",message: "A data informada é maior que a data atual"})
        }
    }

    async cpfValido(cpf: string){
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
        if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
    }

    async emailValido(email:string) {
        if(email.indexOf('@')== -1 || email.indexOf('.')== -1 ){
	        return false        
        }
        return true
        
    }
   
}

export default new ValidatorDefault();