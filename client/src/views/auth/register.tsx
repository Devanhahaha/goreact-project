import { type FC, useState } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/auth/useRegister";

interface ValidationErrors {
    [key: string]: string;
}

export const Register: FC = () => {
    // inisialisasi navigate
    const navigate = useNavigate();

    // inisialisasi use register
    const { mutate, isPending } = useRegister();

    // define state
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // define state for error
    const [errors, setErrors] = useState<ValidationErrors>({});

    // handle submit form
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // call the register mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            // kalo berhasil register, maka akan diarahkan ke halaman login
            onSuccess: () => {
                navigate('/login');
            },
            // kalo gagal register, maka akan menampilkan error
            onError: (error: any) => {
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl bg-amber-950 text-white rounded-2xl shadow-2xl p-8 md:p-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-wide">
                        HALAMAN REGISTER
                    </h1>
                    <p className="text-sm mt-2 text-gray-300">
                        Belajar FullStack Dengan Golang dan React Typescript
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm bg-red-500/20 text-red-300 px-3 py-2 rounded-lg">
                                    {errors.name}
                                </p>
                            )}
                        </div>

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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm bg-red-500/20 text-red-300 px-3 py-2 rounded-lg">
                                    {errors.email}
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
                        {isPending ? "Loading..." : "Register"}
                    </button>

                </form>
            </div>
        </div>
    )
}