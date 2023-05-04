import { TRole } from "./role"

export type TUser = {
    username: string,
    role: TRole,
    _id: string,
}

export type TLogin = {
    login: string,
    password: string,
}


export type TRegister = {
    login: string,
    password: string,
    username: string,
}