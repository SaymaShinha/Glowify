import { useState } from "react";

export default function ProductForm() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    ingredients: [],
  });

  const [showModal, setShowModal] = useState(false);

  const ingredientsList = [
    "Hyaluronic Acid",
    "Niacinamide",
    "Vitamin C",
    "Salicylic Acid",
    "Retinol",
    "Ceramides",
    "Tea Tree",
    "Aloe Vera",
  ];

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

  const handleIngredientChange = (ingredient) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter((item) => item !== ingredient)
        : [...prev.ingredients, ingredient],
    }));
    console.log(ingredient);
  };



  const addProduct = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = new FormData(form);

    // append ingredients manually
    formData.ingredients.forEach(
      (ingredient) => {
        data.append(
          "ingredients",
          ingredient
        );
      }
    );

    const token =
      localStorage.getItem("token");

    try {

      const res = await fetch(
        "http://localhost:5000/api/products/",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );

      const resData = await res.json();

      if (res.ok) {

        setShowModal(true);

        form.reset();

        setFormData({
          ingredients: [],
        });

        setTimeout(() => {
          setShowModal(false);
        }, 2000);

        console.log(
          "Success:",
          resData
        );

      } else {

        console.log(
          "Error:",
          resData.message
        );
      }

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <>


      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">

            <h3 className="font-bold text-lg text-success">
              Success 🎉
            </h3>

            <p className="py-4">
              Product added successfully
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


      <div
        className="min-h-screen flex items-center justify-center bg-base-200 p-6"
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Add Product
          </h2>

          <div className="space-y-4">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProduct(e);
              }}
              className="flex flex-col gap-4 w-full"
            >

              {/* Product Name */}
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                required
              />

              {/* Price */}
              <input
                name="price"
                type="number"
                placeholder="Product Price"
                className="input input-bordered w-full"
                required
              />

              {/* Discount */}
              <input
                name="discount"
                type="number"
                placeholder="Discount"
                className="input input-bordered w-full"
                required
              />
              {/* Category */}
              <select
                name="category"
                defaultValue=""
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select Product Category
                </option>

                {productCategories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {/* Skin Type */}
              <select
                name="skinType"
                defaultValue=""
                className="select select-secondary w-full"
                required
              >
                <option disabled>Skin Type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
              </select>

              {/* Ingredients */}
              <div>
                <label className="block mb-3 font-medium">
                  Ingredients
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredientsList.map((ingredient) => (
                    <label
                      key={ingredient}
                      className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.ingredients.includes(ingredient)}
                        onChange={() =>
                          handleIngredientChange(ingredient)
                        }
                        className="checkbox checkbox-secondary"
                      />

                      <span>{ingredient}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                className="input input-bordered w-full"
                required
              />

              {/* Images */}
              <input
                name="images"
                type="file"
                placeholder="Product Price"
                className="input input-bordered w-full"
                multiple
                accept="image/*"
                required
              />

              {/* Description */}
              <textarea
                name="description"
                cols={5}
                type="textarea"
                placeholder="Description"
                className="input input-bordered w-full"
                required
              />

              {/* Save */}
              <button type="submit" className="btn btn-primary w-full">
                Add Product
              </button>

            </form>

            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>
      </div>

    </>


  );
}