import { useEffect, useState } from "react"
import { useParams } from "react-router";

export default function UserOrders() {
    const { id } = useParams();
    const [userOrders, setUserOrders] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const getUserOrderData = async () => {
                const API = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API}/api/orders/user/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setUserOrders(data);
                    console.log("Success:", data);
                } else {
                    console.log("Error:", data.message);
                }
            }

            getUserOrderData();
        } catch (error) {
            throw error;
        }
    }, []);

    return (
        <>
            <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">My Orders</h1>

                    <div className="space-y-6">
                        {userOrders?.map((order) => (
                            <div
                                key={order._id}
                                className="card bg-base-100 shadow-xl border border-base-300"
                            >
                                <div className="card-body">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <h2 className="card-title">
                                                Order #{order._id.slice(-6)}
                                            </h2>

                                            <p className="text-sm opacity-70">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`badge ${order.status === "pending"
                                                        ? "badge-warning"
                                                        : order.status === "delivered"
                                                            ? "badge-success"
                                                            : "badge-error"
                                                    }`}
                                            >
                                                {order.status}
                                            </div>

                                            <div className="font-bold text-lg">
                                                ${order.totalPrice}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div className="mt-5 space-y-4">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-base-200"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-lg border"
                                                />

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">
                                                        {item.name}
                                                    </h3>

                                                    <p className="text-sm opacity-70">
                                                        Product ID: {item.productId}
                                                    </p>

                                                    <div className="mt-2 flex gap-4 text-sm">
                                                        <p>
                                                            Price: <span className="font-semibold">${item.price}</span>
                                                        </p>

                                                        <p>
                                                            Qty:{" "}
                                                            <span className="font-semibold">
                                                                {item.quantity}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping */}
                                    <div className="divider">Shipping Address</div>

                                    <div className="bg-base-200 rounded-xl p-4 text-sm">
                                        <p>
                                            <span className="font-semibold">Address:</span>{" "}
                                            {order.shippingAddress.address}
                                        </p>

                                        <p>
                                            <span className="font-semibold">City:</span>{" "}
                                            {order.shippingAddress.city}
                                        </p>

                                        <p>
                                            <span className="font-semibold">Phone:</span>{" "}
                                            {order.shippingAddress.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}