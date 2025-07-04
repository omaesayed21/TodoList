export  interface IRegisterinput {
    name : "username" | "email" | "password"
    placeholder : string
    type : string
    Validation : {
        required ?: boolean
        minLength? : number
        pattern? : RegExp
    }
}


export interface IErrorResponse {
    error : {
        message? : string
    }
}

export interface Ilogininput {
    name : "identifier" | "password"
    placeholder : string
    type : string
    Validation : {
        required ?: boolean
        minLength? : number
        pattern? : RegExp
}
}
export interface ITodo {
    documentId: string
    id : number
    title : string
    description : string
}