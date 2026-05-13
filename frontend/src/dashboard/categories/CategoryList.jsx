import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

  const deleteCategory = async(id) => {
    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API}/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCategories((prev) =>
          prev.filter((order) => order._id !== id)
        );

        console.log(data);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-3xl">

        {/* Header */}
        <div className="card-body border-b border-base-200">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Category List
              </h2>

              <p className="text-base-content/60 mt-1">
                Manage all category
              </p>
            </div>

            <div className="badge badge-primary badge-lg p-4">
              {categories.length} Category
            </div>

            <button className="btn btn-primary rounded-xl" onClick={() => navigate("/admin/add-category")}>
              + Add Category
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="table">

            {/* head */}
            <thead className="bg-base-200 text-base">
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {categories?.map((cat) => (

                <tr
                  key={cat._id}
                  className="hover"
                >

                  <td className="min-w-[350px]">
                    <div className="flex flex-col gap-4">
                      <img src={cat.image} alt={cat.name} className="w-10 h-10" />
                    </div>
                  </td>

                  <td className="min-w-[220px]">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {cat.name}
                      </p>
                    </div>
                  </td>

                  <td className="min-w-[220px]">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {cat.description}
                      </p>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td>

                    <div className="dropdown dropdown-end">

                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm text-xl"
                      >
                        ⋮
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-2xl z-[1] w-44 p-2 shadow-xl border border-base-200"
                      >

                        <li>
                          <a className="text-error" onClick={() => deleteCategory(cat._id)}>
                            Delete
                          </a>
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

    </>
  );
}