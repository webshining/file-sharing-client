export interface User {
	id: number;
	name: string;
	email?: string;
}

export interface UserPayload {
	user: User | null;
	error: string | null;
}

export interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

export interface UserBody {
	name: string;
	email: string;
	password: string;
}
