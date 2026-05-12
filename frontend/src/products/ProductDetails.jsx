import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";


export default function ProductDetails() {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API}/api/products/${id}`
        );

        const data = await res.json();

        if (res.ok) {
          setProduct(data.data);

          // set first image
          setSelectedImage(data.data.images?.[0] || null);

          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getProductsData();
    }
  }, [id]);

  const addToCart = () => {
    let getDataLS = JSON.parse(localStorage.getItem("glowify-cart")) || [];

    const getFiltered = getDataLS.filter((item) => item._id == product._id);
    if (getFiltered.length == 0) {
      product["quantity"] = 1;
      getDataLS.push(product);
      localStorage.setItem("glowify-cart", JSON.stringify(getDataLS));
    }

    // Notify header to update cart count
    window.dispatchEvent(new Event("storage"));
  }


  return (
    <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* LEFT: IMAGE GALLERY */}
        <div>
          {/* Main Image */}
          <div className="card bg-base-100 shadow-md mb-4">
            <figure>
              <img
                src={selectedImage}
                alt="product"
                className="w-full h-96 object-cover rounded-xl"
              />
            </figure>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${selectedImage === img
                  ? "border-primary"
                  : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-6">

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-lg text-primary font-semibold">
            ${product.price}
          </p>

          <p className="text-base-content/80">
            {product.description}
          </p>

          {/* Skin Types */}
          <div>
            <h3 className="font-semibold mb-2">
              Suitable for:
            </h3>
            <div className="flex flex-wrap gap-2">

              <span
                className="badge badge-outline"
              >
                {product.skinType}
              </span>

            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-2">
              Ingredients:
            </h3>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {product.ingredients?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="input input-bordered w-20"
            />

            <button className="btn btn-primary flex-1" onClick={() => addToCart()}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
