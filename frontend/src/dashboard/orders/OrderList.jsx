import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const deleteOrder = async (id) => {
    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API}/api/orders/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const data = await res.json();

      if (res.ok) {

        setOrders((prev) =>
          prev.filter((order) => order._id !== id)
        );

        console.log(data);

      } else {

        console.log(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  }


  const handleStatusChange = async (id, value) => {
    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API}/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: value,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order updated");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id
              ? { ...order, status: value }
              : order
          )
        );
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-3xl">

        {/* Header */}
        <div className="card-body border-b border-base-200">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Orders List
              </h2>

              <p className="text-base-content/60 mt-1">
                Manage all customer orders
              </p>
            </div>

            <div className="badge badge-primary badge-lg p-4">
              {orders.length} Orders
            </div>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="table">

            {/* head */}
            <thead className="bg-base-200 text-base">
              <tr>
                <th>User</th>
                <th>Products</th>
                <th>Shipping</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {orders?.map((order) => (

                <tr
                  key={order._id}
                  className="hover"
                >

                  {/* USER */}
                  <td className="min-w-[220px]">

                    <div className="flex flex-col gap-1">

                      <p className="font-bold">
                        {order.shippingAddress?.name}
                      </p>

                      <p className="text-sm opacity-60 break-all">
                        {order.userId}
                      </p>

                      <p className="text-xs opacity-50">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                    </div>

                  </td>

                  {/* PRODUCTS */}
                  <td className="min-w-[350px]">

                    <div className="flex flex-col gap-4">

                      {order?.items?.map((item) => (

                        <div
                          key={item.productId}
                          className="flex items-center gap-3 bg-base-200 p-3 rounded-2xl"
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl border"
                          />

                          <div className="flex-1">

                            <p className="font-semibold line-clamp-1">
                              {item.name}
                            </p>

                            <div className="flex items-center gap-3 mt-1 text-sm opacity-70">

                              <p>
                                Qty: {item.quantity}
                              </p>

                              <p>
                                ${item.price}
                              </p>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </td>

                  {/* SHIPPING */}
                  <td className="min-w-[220px]">

                    <div className="space-y-1">

                      <p className="font-medium">
                        {order.shippingAddress?.address}
                      </p>

                      <p className="text-sm opacity-70">
                        {order.shippingAddress?.city}
                      </p>

                      <p className="text-sm opacity-70">
                        {order.shippingAddress?.phone}
                      </p>

                      <p className="text-sm opacity-70 break-all">
                        {order.shippingAddress?.email}
                      </p>

                    </div>

                  </td>

                  {/* TOTAL */}
                  <td>

                    <div className="badge badge-primary badge-lg font-bold">
                      ${order.totalPrice}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="space-y-2">

                    <select
                      className={`select select-sm w-full max-w-xs
      ${order.status === "pending"
                          ? "select-warning"
                          : order.status === "delivered"
                            ? "select-success"
                            : "select-error"
                        }`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <div
                      className={`badge text-white
      ${order.status === "pending"
                          ? "badge-warning"
                          : order.status === "delivered"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                    >
                      {order.status}
                    </div>

                  </td>

                  {/* ACTIONS */}
                  <td>

                    <div className="dropdown dropdown-end">

                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm text-xl"
                      >
                        ⋮
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-2xl z-[1] w-44 p-2 shadow-xl border border-base-200"
                      >

                        <li>
                          <a onClick={() => navigate(`/admin/orders/${order._id}`)}>View Details</a>
                        </li>

                        <li>
                          <a >Edit</a>
                        </li>

                        <li>
                          <a className="text-error" onClick={() => deleteOrder(order._id)}>
                            Delete
                          </a>
                        </li>

                      </ul>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </>

  );
}