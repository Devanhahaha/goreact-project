import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
}

export const useProductCreate = () => {

    return useMutation ({
        
        mutationFn: async (data: ProductRequest) => {

            const token = Cookies.get('token');

            const response = await Api.post('/api/products', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data
        }
    })
}