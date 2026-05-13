import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";


export default function ProductList() {
  const { name } = useParams();
  const [category, setCategory] = useState("all");
  const [skin, setSkin] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500);
  const [productsData, setProductsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {

    const getCategories = async () => {

      try {

        const API = import.meta.env.VITE_API_URL;

        const res = await fetch(
          `${API}/api/categories/`,
          {
            method: "GET",
          }
        );

        const resData = await res.json();

        if (res.ok) {
          setCategories(resData.data);
          console.log("Success:", resData);

        } else {

          console.log("Error:", resData.message);

        }

      } catch (error) {

        console.log(error);

      }

    };

    getCategories();

  }, []);



  useEffect(() => {
    (name !== "shop_deal" && name) && setCategory(name);

    try {
      const getProductsData = async () => {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/products/`, {
          method: "GET"
        });

        const data = await res.json();

        if (res.ok) {
          setProductsData(data.data);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getProductsData();
    } catch (error) {
      throw error;
    }

  }, [])

  const filteredProducts =
    name === "shop_deal"
      ? productsData.filter((p) =>
        Number(p.discount) >= 20
      )
      : productsData.filter((p) => {
        return (
          (category === "all" ||
            p.category === category) &&
          (skin === "all" ||
            p.skinType === skin) &&
          Number(p.price) <= maxPrice
        );
      });

  return (
    <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">

            <p className="py-4">
              Product has been added to Cart
            </p>

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Close
              </button>
            </div>

          </div>
        </dialog>
      )}

      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid lg:grid-cols-4 gap-6">

        {/* FILTERS */}
        <div className="card bg-base-100 p-4 shadow-md space-y-4">
          <h2 className="font-semibold text-lg">Filters</h2>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option value={cat.name} key={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Skin Type */}
          <div>
            <label className="label">Skin Type</label>
            <select
              className="select select-bordered w-full"
              value={skin}
              onChange={(e) => setSkin(e.target.value)}
            >
              <option value="all">All</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="label">
              Max Price: ${maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range range-primary"
            />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-3 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6">

          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product) => (

              <ProductCard
                key={product._id}
                id={product._id}
                product={product}
                onAddToCart={() => { setShowModal(true); console.log("Product has been added") }} ></ProductCard>
            ))
          )}

        </div>
      </div>
    </div >
  );
}
