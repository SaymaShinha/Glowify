import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Checkout() {
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getDataLS = JSON.parse(localStorage.getItem("glowify-cart")) || [];
    setCartItems(getDataLS);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      if (cartItems.length > 0 && form.name !== "" && form.email !== "" && form.phone !== "" && form.address !== "" && form.city !== "") {
        const API = import.meta.env.VITE_API_URL;
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("city", form.city);

        formData.append("items", JSON.stringify(cartItems));
        formData.append("total", total + 5);

        const res = await fetch(`${API}/api/orders`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const resData = await res.json();

        setPlaced(true);
        console.log("Success:", resData);
        localStorage.removeItem("glowify-cart");
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      throw error;
    }
  }


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
            onClick={() => { setPlaced(false), navigate("/") }}
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
                required
              />

              <input
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                className="input input-bordered md:col-span-2"
                onChange={handleChange}
                required
              />

              <input
                name="address"
                placeholder="Address"
                className="input input-bordered md:col-span-2"
                onChange={handleChange}
                required
              />

              <input
                name="city"
                placeholder="City"
                className="input input-bordered"
                onChange={handleChange}
                required
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
                key={item._id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
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