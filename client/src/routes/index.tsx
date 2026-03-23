// import use context
import { useContext } from "react";

// import context
import { AuthContext } from "../context/AuthContext";

// import react router dom
import { Routes, Route, Navigate } from "react-router";

// import view home
import { Home } from "../views/home";

// import view register
import { Register } from "../views/auth/register";

// import view login
import { Login } from "../views/auth/login";

// import view dashboard
import Dashboard from "../views/admin/dashboard";

// import users
import UsersIndex from "../views/admin/users";

// import users create
import UserCreate from "../views/admin/users/create";

// import users update
import UserUpdate from "../views/admin/users/update";

// import product index
import ProductIndex from "../views/admin/products";

// import product create
import ProductCreate from "../views/admin/products/create";

// import product update
import ProductUpdate from "../views/admin/products/update";

export default function AppRoutes() {

    // menggunakan use context untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // menggunakan optional chaining untuk mengecek apakah auth.user ada atau tidak
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Register */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register /> 
            } />
            
            {/* Login */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login /> 
            } />

            {/* Dashboard */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace /> 
            } />

            {/* User */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace /> 
            } />

            {/* User Create*/}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace /> 
            } />

            {/* User Update*/}
            <Route path="/admin/users/edit/:id" element={
                isAuthenticated ? <UserUpdate /> : <Navigate to="/login" replace /> 
            } />

            {/* Product Index */}
            <Route path="/admin/products" element={
                isAuthenticated ? <ProductIndex /> : <Navigate to="/login" replace /> 
            } />

            {/* Product Create */}
            <Route path="/admin/products/create" element={
                isAuthenticated ? <ProductCreate /> : <Navigate to="/login" replace /> 
            } />

            {/* Product Update */}
            <Route path="/admin/products/edit/:id" element={
                isAuthenticated ? <ProductUpdate /> : <Navigate to="/login" replace /> 
            } />
        </Routes>
    )
}