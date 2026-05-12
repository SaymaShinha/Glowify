import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const productCategories = [
  "Cleanser",
  "Face Wash",
  "Toner",
  "Serum",
  "Moisturizer",
  "Night Cream",
  "Day Cream",
  "Eye Cream",
  "Sunscreen",
  "Face Mask",
  "Sheet Mask",
  "Exfoliator",
  "Scrub",
  "Lip Balm",
  "Lip Scrub",
  "Lipstick",
  "Foundation",
  "Concealer",
  "Primer",
  "BB Cream",
  "CC Cream",
  "Blush",
  "Highlighter",
  "Contour",
  "Compact Powder",
  "Loose Powder",
  "Setting Spray",
  "Eyeliner",
  "Mascara",
  "Eyeshadow",
  "Eyebrow Pencil",
  "Makeup Remover",
  "Micellar Water",
  "Body Lotion",
  "Body Butter",
  "Body Wash",
  "Hand Cream",
  "Foot Cream",
  "Shampoo",
  "Conditioner",
  "Hair Serum",
  "Hair Oil",
  "Hair Mask",
  "Scalp Treatment",
  "Acne Treatment",
  "Anti-Aging",
  "Brightening",
  "Hydrating",
  "Sensitive Skin Care",
  "Men's Grooming",
];



export default function ProductList() {
  const [category, setCategory] = useState("all");
  const [skin, setSkin] = useState("all");
  const [maxPrice, setMaxPrice] = useState(50);

  const [productsData, setProductsData] = useState([]);


  useEffect(() => {
    try {
      const getProductsData = async () => {
        const res = await fetch("http://localhost:5000/api/products/", {
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
    productsData.filter((p) => {
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
              {productCategories.map((cat) => (
                <option value={cat} key={cat}>{cat}</option>
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
              max="100"
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
                onAddToCart={() => console.log("Product has been added")} ></ProductCard>
            ))
          )}

        </div>
      </div>
    </div >
  );
}