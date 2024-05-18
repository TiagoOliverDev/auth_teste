import { API } from "../axiosConfig";
import { IDetaisUser } from "../../../../@types/IDetaisUser";


const getByToken = async (): Promise<IDetaisUser | Error> => {
    try {
        const urlRelative = `/auth/profile/`;
        
        const response = await API.get(urlRelative);

        if (response && response.data) {
            return response.data;
        }

        return new Error("Erro ao retornar dados do usuário!");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao retornar dados do usuário!");
    };
};


export const UserService = {
    getByToken,
};