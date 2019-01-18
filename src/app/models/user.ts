export interface UserDetails {
    _id: string;
    username: string;
    firstName: string;
    exp: number;
    iat: number;
}

export interface UserBasicDetails {
    _id: string;
    username: string;
    name: string;
}

export interface UserProfile {
    _id: string;
    username: string;
    name: string;
    registered: Array<string>;
    organised: Array<string>;
    interested: Array<string>;
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    username: string;
    password: string;
}
