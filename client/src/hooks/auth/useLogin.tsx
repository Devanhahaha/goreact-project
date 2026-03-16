// import use mutation dari react query untuk melakukan login
import { useMutation } from "@tanstack/react-query";

// import services API
import Api from "../../services/api";

// interface login request
interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = () => {

    return useMutation({

        // mutation untuk login
        mutationFn: async (data: LoginRequest) => {

            // menggunakan services API untuk login
            const response = await Api.post('api/login', data);

            // mengembalikan response data
            return response.data;
        }
    })
}