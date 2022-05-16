import { Config } from '../../config/config';
import IUsuario from '../../types/IUsuario';
import UsuarioRepositories from '../repositories/UsuarioRepositories';
import UsuarioValidator from '../validators/UsuarioValidator';
import bcryptjs from 'bcryptjs';


class UsuarioService {
    
    async create(data: IUsuario){
        await UsuarioValidator.create(data);
        delete data.confirmeSenha

        if(Config.jwtSalt){
            var salt: any = bcryptjs.genSaltSync(parseInt(Config.jwtSalt));
        } 
        data.senha = bcryptjs.hashSync(data.senha, salt),
        data.status = "ativo"
        
        let retorno = await UsuarioRepositories.insert({
            tabela: "admin",
            data
        });
        
        return retorno        

    }

    async select(filtros: any){

        let retorno = await UsuarioRepositories.get({
            tabela: "admin",
            filtros
        })


        return retorno        

    }

    async update(data: IUsuario,id_admin: any){

        //validator

        let retorno = await UsuarioRepositories.update({
            tabela:"admin",
            condicao: {id_admin},
            data
        });
        
        return retorno        

    }

    async delete(id_admin: any){

        //validator

        let retorno = await UsuarioRepositories.delete({
            tabela: "admin",
            condicao: {id_admin}
        });
        
        return retorno        

    }

    async getById(id_admin: any){

        //validator

        let retorno = await UsuarioRepositories.get({
            // raw: `id_admin = '${id_admin}'`,
            tabela: "admin",
            filtros: {id_admin}

        });
        
        return retorno        

    }

}

export default new UsuarioService();