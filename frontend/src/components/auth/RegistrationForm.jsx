import { useState } from "react";
import { useNavigate } from "react-router";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);



  const submitRegistration = async (e) => {
    const form = e.target;
    const data = new FormData(form);
    const objData = Object.fromEntries(data);

    console.log(Object.fromEntries(data));

    if (objData.password === objData.confirmPassword) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          body: data,
        });

        const resData = await res.json();

        if (res.ok) {
          setShowModal(true);
          console.log("Success:", resData);
          setTimeout(() => {
            setShowModal(false);
          }, 2000);
        } else {
          console.log("Error:", resData.message);
        }
      } catch (error) {
        throw error;
      }
    }

    else {
      console.log("Password entered are not same");
    }

  };


  return (
    <>
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">

            <h3 className="font-bold text-lg text-success">
              Welcome 🎉
            </h3>

            <p className="py-4">
              You successfully signed up
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
        data-theme="cosmetic"
        className="min-h-screen flex items-center justify-center bg-base-200 p-6"
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-4">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitRegistration(e);
              }}
              className="flex flex-col gap-4 w-full"
            >

              {/* Name */}
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />

              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                required
              />

              {/* Skin Type */}
              <select
                name="skinType"
                defaultValue="Combination"
                className="select select-secondary w-full"
              >
                <option disabled>Skin Type</option>
                <option>Oily</option>
                <option>Dry</option>
                <option>Combination</option>
              </select>

              {/* Address */}
              <fieldset className="bg-base-200 border rounded-box w-full p-4">
                <legend className="font-semibold">Address & Contact details</legend>

                <input
                  name="phone"
                  type="text"
                  className="input w-full mt-2"
                  placeholder="Phone"
                />

                <input
                  name="city"
                  type="text"
                  className="input w-full mt-2"
                  placeholder="City"
                />

                <input
                  name="area"
                  type="text"
                  className="input w-full mt-2"
                  placeholder="Area/Road"
                />
              </fieldset>

              {/* Password */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                required
              />

              {/* Terms */}
              <label className="flex items-center gap-2">
                <input
                  name="terms"
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  required
                />
                <span>I agree to the Terms & Conditions</span>
              </label>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>

            </form>


            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social */}
            <button className="btn btn-outline w-full">
              Continue with Google
            </button>

            {/* Login link */}
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span className="text-primary cursor-pointer" onClick={() => navigate("/auth/login")}>
                Login
              </span>
            </p>

          </div>
        </div>
      </div>
    </>

  );
}