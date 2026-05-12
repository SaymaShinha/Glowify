import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const getUsersData = async () => {
        const res = await fetch("http://localhost:5000/api/users/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
          console.log("Success:", data);
        } else {
          console.log("Error:", data.message);
        }
      }

      getUsersData();
    } catch (error) {
      throw error;
    }

  }, [])


  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="card-title text-2xl">
                Users List
              </h2>

              <p className="text-base-content/60">
                Manage all users
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl">
            <table className="table">
              {/* head */}
              <thead className="bg-base-200">
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Role</th>
                  <th>User Address</th>
                  <th>User City</th>
                  <th>user Phone</th>
                  <th>Skin Type</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {users?.map((user) => (
                  <tr className="hover">
                    <td>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold">
                            {user.name}
                          </div>

                          <div className="text-sm opacity-50 line-clamp-1">
                            {user.createdAt}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="badge badge-secondary">
                        {user.email}
                      </div>
                    </td>

                    <td>{user.role}</td>

                    <td>{user.addresses[0].address}</td>
                    <td>{user.addresses[0].city}</td>
                    <td>
                      {user.addresses[0].phone}
                    </td>

                    <td className="font-semibold">
                      {user.skinType}
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
  )
}