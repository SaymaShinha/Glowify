import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function OrdersDetails() {
    const { id } = useParams();

    const [order, setOrder] = useState([]);
    const token = localStorage.getItem("token");


    useEffect(() => {
        try {
            const getOrderData = async () => {
                const API = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API}/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setOrder(data[0]);
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

    return (
        <>
            <div className="min-h-screen bg-base-200 p-6">

                <div className="max-w-5xl mx-auto">

                    {/* HEADER */}
                    <div className="card bg-base-100 shadow-2xl rounded-3xl border border-base-200 mb-6">

                        <div className="card-body">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Order Details
                                    </h1>

                                    <p className="text-base-content/60 mt-1">
                                        Order ID: {order._id}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="badge badge-primary badge-lg capitalize">
                                        {order.status}
                                    </div>

                                    <div className="badge badge-outline badge-lg">
                                        ${order.totalPrice}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* MAIN GRID */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* PRODUCTS */}
                        <div className="lg:col-span-2">

                            <div className="card bg-base-100 shadow-xl rounded-3xl">

                                <div className="card-body">

                                    <h2 className="text-2xl font-bold mb-6">
                                        Ordered Products
                                    </h2>

                                    <div className="space-y-5">

                                        {order?.items?.map((item) => (

                                            <div
                                                key={item.productId}
                                                className="flex flex-col md:flex-row gap-5 bg-base-200 p-4 rounded-2xl"
                                            >

                                                {/* IMAGE */}
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full md:w-36 h-36 object-cover rounded-2xl border"
                                                />

                                                {/* INFO */}
                                                <div className="flex-1 flex flex-col justify-between">

                                                    <div>

                                                        <h3 className="text-xl font-bold">
                                                            {item.name}
                                                        </h3>

                                                        <p className="text-base-content/60 mt-2">
                                                            Product ID: {item.productId}
                                                        </p>

                                                    </div>

                                                    <div className="flex flex-wrap gap-3 mt-4">

                                                        <div className="badge badge-primary badge-lg">
                                                            ${item.price}
                                                        </div>

                                                        <div className="badge badge-secondary badge-lg">
                                                            Qty: {item.quantity}
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">

                            {/* SHIPPING */}
                            <div className="card bg-base-100 shadow-xl rounded-3xl">

                                <div className="card-body">

                                    <h2 className="text-xl font-bold mb-4">
                                        Shipping Address
                                    </h2>

                                    <div className="space-y-3">

                                        <div>
                                            <p className="text-sm opacity-60">
                                                Address
                                            </p>

                                            <p className="font-semibold">
                                                {order.shippingAddress?.address}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm opacity-60">
                                                City
                                            </p>

                                            <p className="font-semibold">
                                                {order.shippingAddress?.city}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm opacity-60">
                                                Phone
                                            </p>

                                            <p className="font-semibold">
                                                {order.shippingAddress?.phone}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ORDER INFO */}
                            <div className="card bg-base-100 shadow-xl rounded-3xl">

                                <div className="card-body">

                                    <h2 className="text-xl font-bold mb-4">
                                        Order Info
                                    </h2>

                                    <div className="space-y-4">

                                        <div className="flex justify-between">
                                            <span className="opacity-60">
                                                User ID
                                            </span>

                                            <span className="font-semibold text-right break-all">
                                                {order.userId}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="opacity-60">
                                                Created
                                            </span>

                                            <span className="font-semibold">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="opacity-60">
                                                Updated
                                            </span>

                                            <span className="font-semibold">
                                                {new Date(order.updatedAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="flex justify-between text-lg font-bold">

                                            <span>Total</span>

                                            <span className="text-primary">
                                                ${order.totalPrice}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}