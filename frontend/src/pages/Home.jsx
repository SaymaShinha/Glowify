import { useNavigate } from "react-router";
import ProductCard from "../products/ProductCard.jsx";
import { useState, useEffect } from "react";

export default function Home() {
    const [productsData, setProductsData] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        try {
            const getProductsData = async () => {
                const API = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API}/api/products/`, {
                    method: "GET"
                });

                const data = await res.json();

                if (res.ok) {
                    const featuredProduct = data.data.slice(0, 4)

                    setProductsData(featuredProduct);
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


    useEffect(() => {
        const updateCartCount = () => {
            const cart =
                JSON.parse(localStorage.getItem("glowify-cart")) || [];

            setCartCount(cart.length);
        };

        // Initial load
        updateCartCount();

        // Listen for updates
        window.addEventListener("storage", updateCartCount);

        return () => {
            window.removeEventListener("storage", updateCartCount);
        };
    }, []);


    const navigate = useNavigate();
    return (
        <>
            <div data-theme="cosmetic" className="bg-base-200">

                {/* 🌸 HERO BANNER */}
                <section className="hero min-h-[70vh] bg-base-100">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                        <img
                            src="/hero.jpg"
                            className="max-w-sm rounded-lg shadow-2xl"
                        />

                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold">
                                Glow Naturally ✨
                            </h1>
                            <p className="py-4 opacity-80">
                                Discover skincare that loves your skin. Hydration, glow,
                                and confidence in every drop.
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate("/productlist")}>
                                Shop Now
                            </button>
                        </div>

                    </div>
                </section>

                {/* 🧴 CATEGORIES */}
                <section className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Shop by Category
                    </h2>

                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6">

                        {[
                            { name: "Cleanser", img: "/cleanser/dr-jart.jfif" },
                            { name: "Serum", img: "/serum/derma.jpg" },
                            { name: "Moisturizer", img: "/moisturizer/plum.jfif" },
                            { name: "Sunscreen", img: "/sunscreen/innisfree.jfif" },
                        ].map((cat, i) => (
                            <div
                                key={i}
                                className="card bg-base-100 shadow-md hover:shadow-xl transition cursor-pointer"
                                onClick={()=>navigate(
                                    
                                )}
                            >
                                <figure>
                                    <img
                                        src={cat.img}
                                        className="h-40 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center p-4">
                                    <h3 className="font-semibold">{cat.name}</h3>
                                </div>
                            </div>
                        ))}

                    </div>
                </section>

                {/* ⭐ FEATURED PRODUCTS */}
                <section className="p-6 bg-base-100">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Featured Products
                    </h2>

                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6">

                        {productsData.map((product, i) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={() => console.log("Product Has been added")}
                            />
                        ))}

                    </div>
                </section>

                {/* 🔥 DISCOUNT SECTION */}
                <section className="p-6">
                    <div className="hero bg-primary text-primary-content rounded-xl">
                        <div className="hero-content text-center">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    20% OFF Skincare Essentials
                                </h2>
                                <p className="py-3">
                                    Limited time offer. Get glowing today!
                                </p>
                                <button className="btn btn-secondary">
                                    Shop Deals
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>

    );
}