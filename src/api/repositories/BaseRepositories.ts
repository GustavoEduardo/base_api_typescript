import moment from 'moment';
import { IDelete, IGet, IInsert, IUpdate } from '../../types/repositories/IBaseCrud';
import {Connect} from './Connection';

export default class BaseRepositories{

    async validaColuna(tabela: string,coluna: string) {
        let infoColumns = await Connect.table(tabela).columnInfo()
        
        if(!infoColumns.hasOwnProperty(String(coluna))){
            throw {message: coluna +" não é um filtro válido"}
        }     
    }

    async insert({
        tabela = "",
        data = {}
    }:IInsert){

        data.criado = moment().format("YYYY-MM-DD HH-mm-ss")
        data.modificado = moment().format("YYYY-MM-DD HH-mm-ss")
      
        let retorno = await Connect.table(tabela).insert(data);
        
        return retorno[0];   
    }

    async get({
        tabela = "",
        filtros = {},
        campos = "*",
        raw = ""
    }:IGet){
        let tipo_ordem = "asc"
       
        let query = Connect.table(tabela).select(campos);

        if(filtros && Object.values(filtros).length > 0){
            
            if(filtros.ordem){
                var ordem = filtros.ordem
                delete filtros.ordem
            }

            if(filtros.tipo_ordem){
                tipo_ordem = filtros.tipo_ordem
                delete filtros.tipo_ordem
            }

            filtros = Object.entries(filtros)
            try {
                for(let f of filtros){
                    await this.validaColuna(tabela,String([f[0]]))                  
                    let filtro = {[f[0]]: f[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }
    
        }        

        if(ordem){
            query.orderBy(ordem,tipo_ordem)
        }

        if(raw){
            query.whereRaw(raw)
        }

        let retorno = await query

        return retorno;
        
    }

    async update({
        tabela = "",
        data={},
        condicao = {},
        raw = ""
    }:IUpdate){   
        
        data.modificado = moment().format("YYYY-MM-DD HH-mm-ss")
        let query = Connect.table(tabela).update(data);

        if(condicao && Object.values(condicao).length > 0){            
            condicao = Object.entries(condicao)
            try {
                for(let c of condicao){
                    await this.validaColuna(tabela,String([c[0]]))                  
                    let filtro = {[c[0]]: c[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }    
        }else{
            throw {message:"Informe a condição"}
        }

        if(raw){
            query.whereRaw(raw)
        }

        let retorno = await query

        return retorno;
    }

    async delete({
        tabela= "",
        condicao ={}
    }:IDelete) {
        
        let query = Connect.table(tabela).delete();

        if(condicao && Object.values(condicao).length > 0){            
            condicao = Object.entries(condicao)
            try {
                for(let c of condicao){
                    await this.validaColuna(tabela,String([c[0]]))                  
                    let filtro = {[c[0]]: c[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }    
        }else{
            throw {message:"Informe a condição"}
        }

        let retorno = await query

        return retorno;
        
    }
}
