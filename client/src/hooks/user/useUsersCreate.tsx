// import use mutation dari tanstack query
import { useMutation } from "@tanstack/react-query";

// import api
import Api from "../../services/api";

// import cookie
import Cookies from "js-cookie";

// interface user request
interface UserRequest {
    name: string
    username: string
    email: string
    password: string
}

export const useUsersCreate = () => {

    return useMutation({

        // mutation untuk create user
        mutationFn: async (data: UserRequest) => {

            // ambil token dari cookie
            const token = Cookies.get('token');

            // menggunakan service api untuk register
            const response = await Api.post('/api/users', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            // kembalikan response data
            return response.data;
        }
    });
};