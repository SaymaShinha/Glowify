import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function WebHeader() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("cosmetic");
  const [cartCount, setCartCount] = useState(0); // demo

  // Function to load cart count
  const loadCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem("glowify-cart")) || [];
    setCartCount(cartData.length);
  };

  useEffect(() => {
    // Initial load
    loadCartCount();

    // Listen for localStorage changes
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  const removeAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login");
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-4">

      {/* LEFT */}
      <div className="navbar-start">

        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Home</a></li>
            <li><a>Shop</a></li>
            <li><a>Categories</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        {/* Logo */}
        <a className="btn btn-ghost text-xl font-bold" href="/">
          Glowify
        </a>
      </div>

      {/* CENTER (desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>Shop</a></li>
          <li><a>Categories</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered input-sm w-24 md:w-auto"
        />

        {/* Cart */}
        <div className="indicator">
          <span className="indicator-item badge badge-primary badge-sm">
            {cartCount}
          </span>
          <button className="btn btn-ghost btn-circle" onClick={() => navigate("/cart")}>
            🛒
          </button>
        </div>

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            👤
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a onClick={()=>navigate("/user-profile")}>Profile</a></li>
            <li><a>Orders</a></li>
            <li><a onClick={() => removeAuth()}>Logout</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
}