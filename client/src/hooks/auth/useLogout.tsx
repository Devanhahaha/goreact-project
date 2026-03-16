// import hook react
import { useContext } from "react";

// import js cookie
import Cookies from "js-cookie";

// import use navigate dari react router untuk redirect
import { useNavigate } from "react-router";

// import context auth
import { AuthContext } from "../../context/AuthContext";

// custom hook untuk logout
export const useLogout = (): (() => void) => {
    // ambil setIsAuthenticated dari context auth
    const authContext = useContext(AuthContext);

    // gunakan null assertion karena kita yakin context sudah terisi
    const { setIsAuthenticated } = authContext!;

    // inisialisasi use navigate untuk redirect
    const navigate = useNavigate();

    // fungsi untuk logout
    const logout = (): void => {
        // hapus token dan user dari cookie
        Cookies.remove('token');
        Cookies.remove('user');

        // set isAuthenticated ke false
        setIsAuthenticated(false);

        // redirect ke halaman login
        navigate('/login');
    };

    return logout;
};