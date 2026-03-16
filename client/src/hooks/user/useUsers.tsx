// import useQuery dari tanstak query
import { useQuery } from "@tanstack/react-query";

// import api dari services api client
import Api from "../../services/api";

// import cookie dari js cookie
import Cookies from "js-cookie";

// bikin interface user ini berlaku untuk bahasa ts
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

// membuat funtion component useUser
export const useUsers = () => {
    return useQuery<User[], Error>({

        // query key
        queryKey: ['users'],

        // query function
        queryFn: async () => {

            // get token dari cookie
            const token = Cookies.get('token');

            // get user dari api
            const response = await Api.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            // return data
            return response.data.data as User[];
        },
    })
}