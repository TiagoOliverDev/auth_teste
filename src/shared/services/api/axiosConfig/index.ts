import { errorInterceptor, responseInterceptor } from "./interceptors";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { Enviroment } from "../../../environment";

// Função para adicionar o token JWT a cada requisição
const addTokenToRequest = (config: any) => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// Função para tratar erros de resposta
const handleResponseError = (error: AxiosError) => {
    // Aqui você pode adicionar lógica para tratar erros de resposta
    return Promise.reject(error);
};

// Criação da instância do Axios sem definir o header 'Authorization' aqui
const API = axios.create({
    baseURL: Enviroment.URL_BASE,
    headers: {
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json'
    }
});


// Adicionando interceptor de requisição
API.interceptors.request.use(addTokenToRequest, (error) => Promise.reject(error));

// Adicionando interceptor de resposta
API.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleResponseError
);

export { API };