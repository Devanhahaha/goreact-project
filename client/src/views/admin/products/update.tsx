import Sidebar from "../../../component/sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useProductsById } from "../../../hooks/product/useProductsById";
import { useProductsUpdate } from "../../../hooks/product/useProductsUpdate";

interface ValidationErrors {
    [key: string]: string;
}

export default function ProductUpdate() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrors>({})

    const { data: product } = useProductsById(Number(id));

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
        }
    }, [product]);

    const {mutate, isPending} = useProductsUpdate();

    const HandleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ id: Number(id), data: {name, price, description} }, {
            onSuccess: () => navigate('/admin/products'),
            onError: (error: any) => setErrors(error.response.data.errors),
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Update Product</h1>
                    <p className="text-sm text-gray-500 mt-1">Fill in the details to update a product</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700">Product Information</h2>
                    </div>

                    <form onSubmit={HandleUpdateProduct} className="px-6 py-6 space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Name Products
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. John Doe"
                                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors duration-150 outline-none
                                    focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                                    ${errors.Name
                                        ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300'
                                        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300'
                                    }`}
                            />
                            {errors.Name && (
                                <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm.75 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {errors.Name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Harga Products
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                    placeholder="harga product"
                                    className={`w-full pl-8 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors duration-150 outline-none font-mono
                                        focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                                        ${errors.Price
                                            ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300'
                                            : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300'
                                        }`}
                                />
                            </div>
                            {errors.Price && (
                                <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm.75 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {errors.Price}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Deskripsi Product
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="deskripsi product"
                                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors duration-150 outline-none
                                    focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                                    ${errors.Description
                                        ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300'
                                        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300'
                                    }`}
                            />
                            {errors.Description && (
                                <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm.75 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {errors.Description}
                                </p>
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                            <Link
                                to="/admin/products"
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-150"
                            >
                                ← Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-150"
                            >
                                {isPending ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Updating...
                                    </>
                                ) : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}