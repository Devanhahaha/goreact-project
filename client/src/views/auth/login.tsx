import { type FC, useState, useContext} from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

interface ValidationErrors {
    [key: string]: string;
}

export const Login: FC = () => {

    // inisialisasi navigate
    const navigate = useNavigate();

    // inisialisasi use login
    const { mutate, isPending } = useLogin();

    const { setIsAuthenticated } = useContext(AuthContext)!;

    // define state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // define state for error
    const [errors, setErrors] = useState<ValidationErrors>({});

    // handle submit form
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // call the login mutation
        mutate({
            username,
            password
        }, {
            onSuccess: (data: any) => {
                
                Cookies.set('token', data.data.token);

                // set user for cookie
                Cookies.set('user', JSON.stringify({
                    id: data.data.id,
                    name: data.data.name,
                    username: data.data.username,
                    email: data.data.email,
                }));

                // set is authenticated to true
                setIsAuthenticated(true);

                // redirect to dashboard page
                navigate('/admin/dashboard');
            },
            onError: (error: any) => {
                // set error to state
                setErrors(error.response.data.errors);
            }
        })
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl bg-amber-950 text-white rounded-2xl shadow-2xl p-8 md:p-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-wide">
                        HALAMAN LOGIN
                    </h1>
                    <p className="text-sm mt-2 text-gray-300">
                        Belajar FullStack Dengan Golang dan React Typescript
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            {errors.username && (
                                <p className="mt-2 text-sm bg-red-500/20 text-red-300 px-3 py-2 rounded-lg">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm bg-red-500/20 text-red-300 px-3 py-2 rounded-lg">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 cursor-pointer rounded-xl font-semibold bg-amber-500 hover:bg-amber-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Loading..." : "Login"}
                    </button>

                </form>
            </div>
        </div>
    )
}