import { API } from "../axiosConfig";
import { IDetaisUser } from "../../../../@types/IDetaisUser";


const getById = async (id: number): Promise<IDetaisUser | Error> => {
    try {
        const urlRelative = `/auth/profile/${id}`;
        
        const { data } = await API.get(urlRelative);

        if (data && data.user) {
            return data.user[0];
        };

        return new Error("Erro ao retornar dados do usuário!");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao retornar dados do usuário!");
    };
};


export const UserService = {
    getById,
};