export interface IUser {
    id?: number,
    fullName?: string,
    email?: string,
    password?: string,
    avt?: string,
}

export interface IUserSignUp {
    email: string;
    fullName: string;
    id: number;
    avt?: string,
    isLogin: boolean;
}

export interface IComment {
    id: number;
    idUser: number;
    mess?: string,
    id_parent: number;
}