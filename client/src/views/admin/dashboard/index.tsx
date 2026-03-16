import Sidebar from "../../../component/sidebar";

import { useAuthUser } from "../../../hooks/auth/useAuthUser";

export default function Dashboard() {

    const user = useAuthUser();

    return (
        <div className="min-h-screen bg-gray-100 flex">

            <div className="w-64">
                <Sidebar />
            </div>

            <div className="flex-1 p-8">
                <div className="bg-amber-950 text-white rounded-2xl shadow-xl p-8">

                    <h1 className="text-2xl font-bold mb-4">
                        DASHBOARD
                    </h1>

                    <hr className="border-amber-700" />

                    <h2 className="mt-4 text-lg">
                        {user ? (
                            <p>Selamat datang, <strong>{user.name}</strong>!</p>
                        ) : (
                            <p>Kamu belum login.</p>
                        )}
                    </h2>

                </div>
            </div>

        </div>
    );
}