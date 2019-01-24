export interface UserDetails {
    _id: string;
    email: string;
    firstName: string;
    exp: number;
    iat: number;
}

export interface UserBasicDetails {
    _id: string;
    email: string;
    name: string;
}

export interface UserProfile {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdDate: Date;
    budgetBuyer: Array<string>;
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string;
}
