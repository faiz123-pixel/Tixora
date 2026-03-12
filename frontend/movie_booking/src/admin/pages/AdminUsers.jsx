import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./css/AdminUsers.css";
import { userApi } from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadUsers();
  }, []);

 const loadUsers = async () => {
  try {
    const response = await userApi.get("");
    setUsers(response.data || []);
  } catch (error) {
    console.error("Failed to load users", error);
    alert("Somthing went wrong");
  }
};

  const onSubmit = async (data) => {
    try {
      await userApi.post("/registerAdmin", data);
      loadUsers();
    } catch (error) {
      console.error("User creation failed", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await userApi.delete(`/${id}`);
      loadUsers();
    }
  };

  return (
    <div className="users-container">
      <h2>Users Management</h2>

      {/* Create User Form */}
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Mobile Number */}
        <input
          type="text"
          placeholder="Mobile Number"
          {...register("mobileNo", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit mobile number",
            },
          })}
        />
        {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Create Admin</button>
      </form>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No users available
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.mobileNo}</td>

                <td>
                  <span
                    className={`role-badge ${
                      user.role?.userRole === "ROLE_SUPER_ADMIN"
                        ? "super-admin"
                        : "admin-user"
                    }`}
                  >
                    {user.role?.userRole || user.role}
                  </span>
                </td>

                <td>
                  {user.role?.userRole !== "ROLE_SUPER_ADMIN" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
