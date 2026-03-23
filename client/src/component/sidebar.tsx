import { Link } from "react-router";

import { useLogout } from "../hooks/auth/useLogout";

export default function Sidebar() {

    const logout = useLogout();

    return (
        <div className="bg-white mt-5 rounded-xl shadow-lg overflow-hidden m-5">

            <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">
                    MAIN MENU
                </h2>
            </div>

            <div className="p-4">
                <div className="flex flex-col space-y-2">

                    <Link
                        to="/admin/dashboard"
                        className="px-4 py-2 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition duration-200"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/users"
                        className="px-4 py-2 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition duration-200"
                    >
                        Users
                    </Link>

                    <Link
                        to="/admin/products"
                        className="px-4 py-2 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition duration-200"
                    >
                        Products
                    </Link>

                    <button
                        type="button" onClick={logout}
                        className="text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition duration-200 cursor-pointer"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    )
}