// import use mutation dari react query untuk melakukan register
import { useMutation } from "@tanstack/react-query";

// import services API
import Api from "../../services/api";

// interface register request
interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useRegister = () => {

    return useMutation({
        //  mutasion untuk register
        mutationFn: async (data: RegisterRequest) => {

            // menggunakan services API untuk register
            const response = await Api.post('api/register', data);

            // mengembalikan response data
            return response.data;
        }
    })
}