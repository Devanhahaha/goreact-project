import Sidebar from "../../../component/sidebar";
import { Link } from "react-router";
import { useProducts, type Product } from "../../../hooks/product/useProducts";
import { useProductDelete } from "../../../hooks/product/useProductsDelete";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductsIndex() {
    const { data: products, isLoading, isError, error } = useProducts();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useProductDelete();

    const handleDelete = (id: number) => {

        if (confirm('Are you sure you want to delete this product?')) {

            mutate(id, {

                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['products'] });
                }

            });
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage all registered products</p>
                    </div>
                    <Link
                        to="/admin/products/create"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150"
                    >
                        <span>+ Add Products</span>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                    {isLoading && (
                        <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
                            <svg className="animate-spin w-5 h-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Loading products...
                        </div>
                    )}

                    {isError && (
                        <div className="m-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm.75 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {error?.message ?? "Terjadi kesalahan"}
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">#</th>
                                    <th className="px-6 py-3.5">Nama Products</th>
                                    <th className="px-6 py-3.5">Harga Products</th>
                                    <th className="px-6 py-3.5">Deskripsi Products</th>
                                    <th className="px-6 py-3.5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products?.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                                {products?.map((product: Product, index: number) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-100">
                                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center shrink-0">
                                                    {product.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-800">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono text-xs">
                                                {product.price}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{product.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-md transition-colors duration-150"
                                                >
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(product.id)} disabled={isPending} className="inline-flex items-center gap-1 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md transition-colors duration-150">
                                                    {isPending ? 'DELETING.....' : 'DELETE'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}