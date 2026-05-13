import { useEffect, useState } from "react"

export default function UserProfile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        skinType: "",
        addresses: [],
    });
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    useEffect(() => {
        try {
            const getUserData = async () => {
                const API = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API}/api/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.data);
                    console.log("Success:", data);
                } else {
                    console.log("Error:", data.message);
                }
            }

            getUserData();
        } catch (error) {
            throw error;
        }
    }, []);


    const handleUpdate = async () => {
        try {
            const API = import.meta.env.VITE_API_URL;

            const res = await fetch(
                `${API}/api/users/profile/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(user),
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert("Profile updated");
                console.log(data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div data-theme="cosmetic">
                <div data-theme="cosmetic" className="min-h-screen bg-base-200 p-6">
                    <div className="max-w-4xl mx-auto">

                        {/* Profile Card */}
                        <div className="card bg-base-100 shadow-2xl border border-base-300">

                            {/* Header */}
                            <div className="card-body">

                                <div className="flex items-center gap-5">

                                    {/* Avatar */}
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-20">
                                            <span className="text-3xl font-bold">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={user.name}
                                            onChange={(e) =>
                                                setUser({ ...user, name: e.target.value })
                                            }
                                            className="input input-bordered w-full"
                                        />

                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            onChange={(e) =>
                                                setUser({ ...user, email: e.target.value })
                                            }
                                            className="input input-bordered w-full mt-2"
                                        />

                                        <div className="mt-2 flex gap-2">

                                            <div className="badge badge-primary badge-outline">
                                                {user?.role}
                                            </div>

                                            <label htmlFor="skinType">SkinType:</label>
                                            <select
                                                name="skinType"
                                                className="select select-bordered"
                                                value={user.skinType}
                                                onChange={(e) =>
                                                    setUser({ ...user, skinType: e.target.value })
                                                }
                                            >
                                                <option value="">Select Skin Type</option>
                                                <option value="dry">Dry</option>
                                                <option value="oily">Oily</option>
                                                <option value="combination">Combination</option>
                                                <option value="sensitive">Sensitive</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="divider"></div>

                                {/* User Details */}
                                <div className="grid md:grid-cols-2 gap-4">

                                    <div className="bg-base-200 rounded-xl p-4">
                                        <p className="text-sm text-base-content/60">
                                            User ID
                                        </p>

                                        <p className="font-mono break-all">
                                            {user?._id}
                                        </p>
                                    </div>

                                    <div className="bg-base-200 rounded-xl p-4">
                                        <p className="text-sm text-base-content/60">
                                            Email
                                        </p>

                                        <p>
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div className="bg-base-200 rounded-xl p-4">
                                        <p className="text-sm text-base-content/60">
                                            Created At
                                        </p>

                                        <p>
                                            {new Date(user?.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="bg-base-200 rounded-xl p-4">
                                        <p className="text-sm text-base-content/60">
                                            Updated At
                                        </p>

                                        <p>
                                            {new Date(user?.updatedAt).toLocaleString()}
                                        </p>
                                    </div>

                                </div>

                                {/* Addresses */}
                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        Addresses
                                    </h3>

                                    {
                                        user?.addresses?.length > 0 ? (
                                            <div className="space-y-4">

                                                {
                                                    user.addresses.map((address, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-base-200 rounded-xl p-5 border border-base-300"
                                                        >
                                                            <h4 className="font-bold text-lg mb-2">
                                                                Address {index + 1}
                                                            </h4>

                                                            <div className="grid md:grid-cols-2 gap-3">
                                                                <label htmlFor="address">Address:</label>
                                                                <input
                                                                    name="address"
                                                                    type="text"
                                                                    value={address.address}
                                                                    onChange={(e) => {
                                                                        const updatedAddresses = [...user.addresses];

                                                                        updatedAddresses[index].address =
                                                                            e.target.value;

                                                                        setUser({
                                                                            ...user,
                                                                            addresses: updatedAddresses,
                                                                        });
                                                                    }}
                                                                    className="input input-bordered w-full"
                                                                />

                                                                <label htmlFor="city">City:</label>
                                                                <input
                                                                    name="city"
                                                                    type="text"
                                                                    value={address.city}
                                                                    onChange={(e) => {
                                                                        const updatedAddresses = [...user.addresses];

                                                                        updatedAddresses[index].city =
                                                                            e.target.value;

                                                                        setUser({
                                                                            ...user,
                                                                            addresses: updatedAddresses,
                                                                        });
                                                                    }}
                                                                    className="input input-bordered w-full"
                                                                />

                                                                <label htmlFor="phone">Phone:</label>
                                                                <input
                                                                    type="text"
                                                                    value={address.phone}
                                                                    onChange={(e) => {
                                                                        const updatedAddresses = [...user.addresses];

                                                                        updatedAddresses[index].phone =
                                                                            e.target.value;

                                                                        setUser({
                                                                            ...user,
                                                                            addresses: updatedAddresses,
                                                                        });
                                                                    }}
                                                                    className="input input-bordered w-full"
                                                                />


                                                                <div className="mt-6">
                                                                    <button
                                                                        onClick={handleUpdate}
                                                                        className="btn btn-primary w-full"
                                                                    >
                                                                        Update Profile
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        ) : (
                                            <div className="alert">
                                                <span>No address found</span>
                                            </div>
                                        )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}