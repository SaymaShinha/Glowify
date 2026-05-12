import { useNavigate } from "react-router";
import { calculateDiscount } from "../utils/calculateDiscount.js";
import { formatPrice } from "../utils/formatPrice.js";

export default function ProductCard({ product, id, onAddToCart }) {
  const navigate = useNavigate();


  const addTocart = (product) => {
    let getDataLS = JSON.parse(localStorage.getItem("glowify-cart")) || [];

    const getFiltered = getDataLS.filter((item) => item._id == product._id);
    if (getFiltered.length == 0) {
      product["quantity"] = 1;
      getDataLS.push(product);
      localStorage.setItem("glowify-cart", JSON.stringify(getDataLS));
    }

    // Notify header to update cart count
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out" key={id}>

      {/* Image */}
      <figure className="relative">
        <img
          src={product?.images ||
            "/assets/hero.png"}
          alt={product.name}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-300 hover:scale-105"
        />

        {/* Discount badge */}
        {product.discount > 0 && (
          <span className="badge badge-primary absolute top-2 right-2">
            -{product.discount}%
          </span>
        )}
      </figure>

      {/* Content */}
      <div className="card-body p-4">

        <h2 className="card-title text-sm line-clamp-2">
          {product.name}
        </h2>

        {/* Skin type */}
        <div className="flex gap-2 flex-wrap">
          {product.skinType && (
            <span className="badge badge-outline text-xs">
              {product.skinType}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          {product.discount > 0 ? (
            <>
              <span className="text-primary font-bold">

                {(
                  formatPrice(calculateDiscount(product.price, product.discount))
                )}
              </span>
              <span className="text-sm line-through opacity-60">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-primary font-bold">
              ${product.price}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions mt-3">
          <button
            onClick={() => addTocart(product)}
            className="btn btn-primary transition transform hover:scale-105"
          >
            Add to Cart
          </button>
          <button onClick={() => navigate(`/productdetails/${product._id}`)}
            className="btn btn-info transition transform hover:scale-105">
            Details
          </button>
        </div>

      </div>
    </div>
  );
}