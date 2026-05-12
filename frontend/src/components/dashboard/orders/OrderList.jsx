export default function OrderList({ orders }) {
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id} className="p-4 border rounded mb-3">
          <p>Total: {order.totalPrice}</p>
          <p>Status: {order.status}</p>

          <select className="select select-sm mt-2">
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}