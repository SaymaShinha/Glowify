import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/route.jsx";



ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
