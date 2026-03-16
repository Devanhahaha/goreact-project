import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

interface UserRequest {
    name: string;
    username: string;
    email: string;
    password?: string; // password optional
}

export const useUsersUpdate = () => {
    return useMutation({
        // mutation untuk update user
        mutationFn: async ({ id, data }: { id: number, data: UserRequest }) => {
            // ambil token
            const token = Cookies.get('token')

            const response = await Api.put(`/api/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        }
    })
}