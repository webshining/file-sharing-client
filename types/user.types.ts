export interface User {
    id: number;
    name: string;
    email?: string;
}

export interface AuthBody {
    name?: string;
    email: string;
    password: string;
}
