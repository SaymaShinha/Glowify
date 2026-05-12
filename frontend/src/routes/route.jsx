import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Home from "../components/Home.jsx";
import ProductList from "../components/products/ProductList.jsx";
import Cart from "../components/Cart.jsx";
import Checkout from "../components/Checkout.jsx";
import ProductDetails from "../components/products/ProductDetails.jsx";
import RegistrationForm from "../components/auth/RegistrationForm.jsx";

{/* Auth routes */}
import AuthLayout from "../components/auth/AuthLayout.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import ProtectedRoute from "./ProtectRoute.jsx";

{/* Admin routes */}
import AdminLayout from "../components/dashboard/AdminLayout.jsx";
import Overview from "../components/dashboard/Overview.jsx";
import UserList from "../components/dashboard/users/UserList.jsx";
import AdminProductList from "../components/dashboard/products/ProductList.jsx";
import AdminAddProduct from "../components/dashboard/products/ProductForm.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/productlist", Component: ProductList },
      { path: "/cart", element: 
        (<ProtectedRoute>
        <Cart></Cart>
        </ProtectedRoute>) },
      { path: "/checkout", element:(<ProtectedRoute>
        <Checkout></Checkout>
        </ProtectedRoute>) },
      { path: "/productdetails/:id", Component: ProductDetails },
    ],
  },
  {
    path: "/auth", Component: AuthLayout, children: [
      { index: true, Component: RegistrationForm },
      { path: "login", Component: LoginForm },

    ]
  },
  {
    path:"/admin", Component: AdminLayout, children: [
      {index:true, Component:Overview},
      {path:"users", Component: UserList},
      {path:"products", Component: AdminProductList},
      {path:"add-product", Component: AdminAddProduct},
    ]
  }
]);

export default router;