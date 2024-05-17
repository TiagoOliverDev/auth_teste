export interface IAuthContextData {
    isAuthenticated: boolean;
    id_user: number | undefined;
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void; // não precisa ser Promise pois não vai se conectar com o back
}
