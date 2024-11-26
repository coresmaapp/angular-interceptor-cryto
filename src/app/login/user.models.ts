export interface UserModels {
    username: string,
    email: string,
    first_name: string,
    last_name:string,
    password: string,
    password2: string,
}

export interface responseAccesModels {
    refresh: string,
    access: string,
} 


export interface UserModelLogin extends Omit<UserModels, 'email' | 'first_name'| 'last_name' | 'password2'>{}