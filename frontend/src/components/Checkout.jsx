import { useState } from "react";

const cartItems = [
  { id: 1, name: "Matte Lipstick", price: 19.99, qty: 1 },
  { id: 2, name: "Face Serum", price: 29.99, qty: 2 },
];

export default function Checkout() {
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    // you would send to API here
    setPlaced(true);
  };

  // 🎉 ORDER CONFIRMATION
  if (placed) {
    return (
      <div
        data-theme="cosmetic"
        className="min-h-screen flex items-center justify-center bg-base-200 p-6"
      >
        <div className="card bg-base-100 shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            🎉 Order Confirmed!
          </h2>
          <p className="mb-4">
            Thank you, {form.name || "Customer"}!
          </p>
          <p className="text-sm opacity-70">
            Your beauty products are on the way 💄
          </p>

          <button
            className="btn btn-primary mt-6"
            onClick={() => setPlaced(false)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* SHIPPING FORM */}
        <div className="lg:col-span-2 space-y-6">

          <div className="card bg-base-100 shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Shipping Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                className="input input-bordered"
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                className="input input-bordered md:col-span-2"
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Address"
                className="input input-bordered md:col-span-2"
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                className="input input-bordered"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="card bg-base-100 shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>

          <div className="divider"></div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">
              ${(total + 5).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="btn btn-primary w-full mt-4"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}