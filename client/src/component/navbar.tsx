import { Link } from "react-router";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-amber-950 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-semibold hover:text-gray-300 transition">Home</Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <a
                            href="https://www.linkedin.com/in/devan-herdiansyah-nugroho"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition"
                        >
                            Devan.dev
                        </a>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none cursor-pointer"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <a
                        href="https://www.linkedin.com/in/devan-herdiansyah-nugroho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-gray-300"
                    >
                        Devan.dev
                    </a>
                </div>
            )}
        </nav>
    );
}