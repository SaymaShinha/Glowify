import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getProductsData = async () => {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/products/`, {
          method: "GET"
        });

        const data = await res.json();

        if (res.ok) {
          setProducts(data.data);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getProductsData();
    } catch (error) {
      throw error;
    }

  }, [products])


  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="card-title text-2xl">
                Products List
              </h2>

              <p className="text-base-content/60">
                Manage all cosmetic products
              </p>
            </div>

            <button className="btn btn-primary rounded-xl" onClick={() => navigate("/admin/add-product")}>
              + Add Product
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl">
            <table className="table">
              {/* head */}
              <thead className="bg-base-200">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Skin Type</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Ingredients</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {products.map((product) => (
                  <tr className="hover">
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-14 h-14">
                            <img
                              src={product.images[0]}
                              alt="product"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="font-bold">
                            {product.name}
                          </div>

                          <div className="text-sm opacity-50 line-clamp-1">
                            Brightening serum for glowing skin
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="badge badge-secondary">
                        {product.category}
                      </div>
                    </td>

                    <td>{product.skinType}</td>

                    <td className="font-semibold">
                      {product.price}
                    </td>

                    <td>
                      <div className="badge badge-success">
                        {product.discount}
                      </div>
                    </td>

                    <td>
                      <span className="font-medium">
                        {product.stock}
                      </span>
                    </td>

                    <td>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {product.ingredients.map((e) => (
                          <div className="badge badge-outline">
                            {e}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="badge badge-success">
                        {product.status}
                      </div>
                    </td>

                    <td>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-sm"
                        >
                          ⋮
                        </div>

                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow"
                        >
                          <li>
                            <a>Edit</a>
                          </li>

                          <li>
                            <a>Delete</a>
                          </li>

                          <li>
                            <a>View</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  );
}
