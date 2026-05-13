import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function UpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState({
    name: "",
    category: "",
    skinType: "",
    price: "",
    discount: "",
    stock: "",
    ingredients: [],
  });

  useEffect(() => {

    const getSingleProduct = async () => {

      try {

        const API = import.meta.env.VITE_API_URL;

        const res = await fetch(
          `${API}/api/products/${id}`
        );

        const data = await res.json();

        if (res.ok) {

          setProduct(data.data);

        } else {

          console.log(data.message);

        }

      } catch (error) {

        console.log(error);

      }
    };

    getSingleProduct();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredients = (e) => {

    setProduct((prev) => ({
      ...prev,
      ingredients: e.target.value.split(","),
    }));
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const API = import.meta.env.VITE_API_URL;

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("skinType", product.skinType);
      formData.append("price", product.price);
      formData.append("discount", product.discount);
      formData.append("stock", product.stock);

      formData.append(
        "ingredients",
        JSON.stringify(product.ingredients)
      );

      const res = await fetch(
        `${API}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Product updated");

        navigate("/admin/products");

      } else {

        console.log(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold mb-6">
            Update Product
          </h2>

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="skinType"
              value={product.skinType}
              onChange={handleChange}
              placeholder="Skin Type"
              className="input input-bordered w-full"
            />

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
            />

            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="input input-bordered w-full"
            />

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Ingredients separated by commas"
              className="textarea textarea-bordered w-full"
              value={product.ingredients.join(",")}
              onChange={handleIngredients}
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Update Product
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}