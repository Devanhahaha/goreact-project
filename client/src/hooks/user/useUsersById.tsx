import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface User {
    id: number;
    name: string
    username: string
    email: string
}

export const useUsersById = (id: number) => {
    return useQuery<User, Error>({

        queryKey: ['users', id],

        queryFn: async () => {
            
            // get token from cookie
            const token = Cookies.get('token');

            // get user by id from api
            const response = await Api.get(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data.data as User;
        },
    })
}