import { TRole } from "./role"

export type TUsersData = {
    usersCount?: number,
    analystCount?: number,
    adminCount?: number,
    totalCount?: number,
    users?: TUser[],
}

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