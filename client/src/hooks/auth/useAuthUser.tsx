// import js cookie
import Cookies from "js-cookie";

// interface user
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const useAuthUser = (): User | null => {
    // mengambil data user dari cookie
    const user = Cookies.get('user');

    // jika ada data user parse JSON dan kembalikan, jika tidak kembalikan null
    return user ? JSON.parse(user) : null;
}