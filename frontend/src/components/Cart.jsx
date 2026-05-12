import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getDataLS = JSON.parse(localStorage.getItem("glowify-cart")) || [];
    setCart(getDataLS);
  }, []);

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: Math.max(1, item.quantity + amount),
          }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    const getDataLS = JSON.parse(localStorage.getItem("glowify-cart")) || [];

    const updatedLS = getDataLS.filter((item) => item._id != id);
    setCart(updatedLS);
    localStorage.setItem("glowify-cart", JSON.stringify(updatedLS));
    setCart((prev) => prev.filter((item) => item.id !== id));

    // Notify header to update cart count
    window.dispatchEvent(new Event("storage"));
  };


  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">

            {cart?.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md p-4 flex flex-row gap-4 items-center"
              >

                {/* Image */}
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-primary font-semibold">
                    ${item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="btn btn-sm"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="btn btn-error btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* SUMMARY */}
          <div className="card bg-base-100 shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
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

            <button className="btn btn-primary w-full mt-4" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}