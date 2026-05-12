import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import ProductList from "../products/ProductList.jsx";
import Cart from "../components/Cart.jsx";
import Checkout from "../components/Checkout.jsx";
import ProductDetails from "../products/ProductDetails.jsx";
import RegistrationForm from "../auth/RegistrationForm.jsx";
import UserProfile from "../auth/UserProfile.jsx";

{/* Auth routes */ }
import AuthLayout from "../auth/AuthLayout.jsx";
import LoginForm from "../auth/LoginForm.jsx";
import ProtectedRoute from "./ProtectRoute.jsx";

{/* Admin routes */ }
import AdminLayout from "../dashboard/AdminLayout.jsx";
import Overview from "../dashboard/Overview.jsx";
import UserList from "../dashboard/users/UserList.jsx";
import AdminProductList from "../dashboard/products/ProductList.jsx";
import AdminAddProduct from "../dashboard/products/ProductForm.jsx";
import OrderList from "../dashboard/orders/OrderList.jsx";
import OrderDetails from "../dashboard/orders/OrderDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/productlist", Component: ProductList },
      {
        path: "/cart", element:
          (<ProtectedRoute>
            <Cart></Cart>
          </ProtectedRoute>)
      },
      {
        path: "/checkout", element: (<ProtectedRoute>
          <Checkout></Checkout>
        </ProtectedRoute>)
      },
      {
        path: "/user-profile", element: (<ProtectedRoute>
          <UserProfile></UserProfile>
        </ProtectedRoute>)
      },
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
    path: "/admin", Component: AdminLayout, children: [
      { index: true, Component: Overview },
      { path: "users", Component: UserList },
      { path: "products", Component: AdminProductList },
      { path: "add-product", Component: AdminAddProduct },
      { path: "orders", Component: OrderList },
      { path: "orders/:id", Component: OrderDetails },
    ]
  }
]);

export default router;