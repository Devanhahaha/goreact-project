// import fc from react
import { type FC } from "react";

// import link
import { Link } from "react-router";

export const Home: FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl text-white bg-amber-950 rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">FULLSTACK DEVELOPER</h1>
                        <p className="text-sm mt-2 text-gray-200">Belajar FullStack Dengan Golang dan React Typescript</p>
                    </div>
                    <hr className="border-amber-800" />
                    <div className="gap-4 flex justify-center mt-6">
                        <Link to="/register" className="bg-amber-500 hover:bg-amber-400 rounded-sm px-4 py-2 text-white hover:text-gray-500">Register</Link>
                        <Link to="/login" className="bg-amber-500 hover:bg-amber-400 rounded-sm px-4 py-2 text-white hover:text-gray-500">Login</Link>
                    </div>
            </div>
        </div>
    )
}