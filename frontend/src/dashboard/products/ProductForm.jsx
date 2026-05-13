import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function ProductForm() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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


  const handleIngredientChange = (ingredient) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter((item) => item !== ingredient)
        : [...prev.ingredients, ingredient],
    }));
    console.log(ingredient);
  };


  const handleProduct = async (e) => {
    setLoading(true);

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

    const token = localStorage.getItem("token");

    try {

      const API = import.meta.env.VITE_API_URL;

      // dynamic route
      const url = id
        ? `${API}/api/products/${id}`
        : `${API}/api/products`;

      // dynamic method
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const resData = await res.json();

      if (res.ok) {
        setLoading(false);
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



  // get product by id
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

  useEffect(() => {
    if (product?.ingredients) {
      setFormData({
        ingredients: product.ingredients,
      });
    }
  }, [product]);



  return (
    <>
      {loading && (<Loading></Loading>)}

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
              onSubmit={handleProduct}
              className="flex flex-col gap-4 w-full"
            >

              {/* Product Name */}
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                defaultValue={product?.name}
                className="input input-bordered w-full"
                required
              />

              {/* Price */}
              <input
                name="price"
                type="number"
                placeholder="Product Price"
                defaultValue={product?.price}
                className="input input-bordered w-full"
                required
              />

              {/* Discount */}
              <input
                name="discount"
                type="number"
                placeholder="Discount"
                defaultValue={product?.discount}
                className="input input-bordered w-full"
                required
              />
              {/* Category */}
              <select
                name="category"
                defaultValue={product?.category}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select Product Category
                </option>

                {categories?.map((category) => (
                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Skin Type */}
              <select
                name="skinType"
                defaultValue={product?.skinType}
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
                defaultValue={product?.stock}
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
              />

              {/* Description */}
              <textarea
                name="description"
                cols={5}
                placeholder="Description"
                defaultValue={product?.description}
                className="textarea textarea-bordered w-full"
                required
              />

              {/* Save */}

              {id ? (<button type="submit" className="btn btn-primary w-full">
                Update Product
              </button>) : (<button type="submit" className="btn btn-primary w-full">
                Add Product
              </button>)}

            </form>

            {image && (
              <img
                name="images"
                src={image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border"
                multiple
              />
            )}
          </div>
        </div>
      </div>

    </>


  );
}
