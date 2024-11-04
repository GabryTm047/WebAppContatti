export interface auth {
    token: string;
    refreshToken: string;
    expiration: string;
}

export interface login {
    username: string;
    password: string;
}