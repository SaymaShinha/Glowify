import StatsCard from "./StatsCard";
import { useState, useEffect } from "react";

export default function Overview() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    try {
      const getOrderData = async () => {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/orders/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await res.json();

        if (res.ok) {
          setOrdersCount(data.count);
          setOrders(data.data);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getOrderData();
    } catch (error) {
      throw error;
    }
  }, []);

  // product stat
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  // users stat
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const getUsersData = async () => {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/users/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getUsersData();
    } catch (error) {
      throw error;
    }

  }, [])

  useEffect(() => {
    try {
      const getProductsData = async () => {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/products/`, {
          method: "GET"
        });

        const data = await res.json();

        if (res.ok) {
          setProducts(data.data);
          setProductsCount(data.count);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getProductsData();
    } catch (error) {
      throw error;
    }

  }, [])




  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4">
      <StatsCard title="Total Products" value={productsCount} icon=<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        ></path>
      </svg> timeInterval={`${new Date(
        products[0]?.createdAt
      ).toLocaleDateString()} - ${new Date(
        products[orders.length - 1]?.createdAt
      ).toLocaleDateString()}`} />


      <StatsCard title="New Orders" value={ordersCount} icon=<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        ></path>
      </svg> timeInterval={`${new Date(
        orders[0]?.createdAt
      ).toLocaleDateString()} - ${new Date(
        orders[orders.length - 1]?.createdAt
      ).toLocaleDateString()}`} />


      <StatsCard title="Users" value={users.length} icon=<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg> timeInterval={`${new Date(
        users[0]?.createdAt
      ).toLocaleDateString()} - ${new Date(
        users[orders.length - 1]?.createdAt
      ).toLocaleDateString()}`} />

    </div>
  );
}