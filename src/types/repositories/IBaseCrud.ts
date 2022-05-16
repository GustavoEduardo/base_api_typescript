export interface IGet {
    tabela:string
    filtros?:any|object
    campos?:string
    raw?:string
}

export interface IInsert {
    tabela:string
    data:any|object
}

export interface IUpdate {
    tabela:string
    data?:any|object
    condicao?:any|object
    raw?:string
}

export interface IDelete {
    tabela:string
    condicao:any|object
}