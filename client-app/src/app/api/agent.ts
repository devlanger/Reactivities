import axios, { AxiosResponse } from 'axios';
import { IGame } from '../models/game';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Games = {
    list: () => requests.get<IGame[]>('/games'),
    details: (id: string) => requests.get<IGame>(`/games/${id}`),
    create: (game: IGame) => axios.post<void>(`/games`, game),
    update: (game: IGame) => axios.put<void>(`/games/${game.id}`, game),
    delete: (id: string) => axios.delete<void>(`/games/${id}`),
}

const agent = {
    Games
}

export default agent;