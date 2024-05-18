export interface IDetaisUser {
    id: string; 
    name: string;
    email: string;
    role: string;
    avatar: {
        id: number;
        high: string;
        medium: string;
        low: string;
    };
    last_login: string;
    type: string;
}