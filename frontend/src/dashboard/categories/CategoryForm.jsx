import { useState } from "react";
import Loading from "../../components/Loading.jsx";

export default function CategoryForm() {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCategory = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const token = localStorage.getItem("token");

    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API}/api/categories/`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );

      const resData = await res.json();
      setLoading(false);
      
      if (res.ok) {

        setShowModal(true);

        form.reset();

        console.log("Success:", resData);

        setTimeout(() => {
          setShowModal(false);
        }, 2000);

      } else {

        console.log("Error:", resData.message);

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      {loading && (<Loading></Loading>)}

      {/* SUCCESS MODAL */}
      {showModal && (
        <dialog className="modal modal-open">

          <div className="modal-box">

            <h3 className="font-bold text-lg text-success">
              Success 🎉
            </h3>

            <p className="py-4">
              Category added successfully
            </p>

            <div className="modal-action">

              <button
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

            </div>

          </div>

        </dialog>
      )}

      <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">

        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Add Category
          </h2>

          <form
            onSubmit={handleCategory}
            className="flex flex-col gap-4"
          >

            {/* NAME */}
            <input
              name="name"
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              required
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Category Description"
              className="textarea textarea-bordered w-full"
              required
            />

            {/* IMAGE */}
            <input
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Add Category
            </button>

          </form>

        </div>

      </div>

    </>
  );
}