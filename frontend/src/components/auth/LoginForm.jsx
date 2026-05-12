import { useNavigate } from "react-router";
import Loading from "../Loading.jsx";
import { useState } from "react";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logIn = async (e) => {
        setLoading(true);

        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const API = import.meta.env.VITE_API_URL;
            console.log(API);
            const res = await fetch(`${API}api/auth/login`, {
                method: "POST",
                body: formData,
            });

            const resData = await res.json();

            if (res.ok) {
                localStorage.setItem("token", resData.token);
                localStorage.setItem("role", resData.role);
                setLoading(false);
                navigate("/");
            } else {
                console.log("Error:", resData.message);
                setLoading(false);
                e.target.reset();
            }

        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            {loading && (<Loading></Loading>)}

            <div data-theme="cosmetic" className="relative min-h-screen">

                {/* Background Image */}
                <img
                    src="/assets/hero.png"
                    alt="hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-pink-500/10">

                </div>


                {/* Login Form */}
                <div className="relative flex items-center justify-center min-h-screen">

                    <form
                        className="backdrop-blur-md bg-pink-500/50 shadow-xl rounded-box w-80 p-6 flex flex-col gap-4"
                        onSubmit={(e)=>logIn(e)}
                    >
                            <input
                                type="email"
                                name="email"
                                className="input w-full"
                                placeholder="Email"
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                className="input w-full"
                                placeholder="Password"
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-neutral mt-4 w-full"
                            >
                                Login
                            </button>

                    </form>
                </div>

            </div>
        </>
    )
}
