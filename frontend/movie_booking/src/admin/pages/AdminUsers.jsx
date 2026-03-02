import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getUsers,
  deleteUser,
  createSuperUser,
} from "../services/userService";
import "./css/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "ADMIN",
    },
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const onSubmit = async (data) => {
    await createSuperUser(data);
    reset({ role: "ADMIN" });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
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
        {errors.name && (
          <p className="error">{errors.name.message}</p>
        )}

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
        {errors.mobileNo && (
          <p className="error">{errors.mobileNo.message}</p>
        )}

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
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}

        {/* Role Dropdown */}
        <select {...register("role", { required: true })}>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPER_ADMIN">SUPER ADMIN</option>
        </select>

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
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.mobileNo}</td>
                <td>
                  <span
                    className={`role-badge ${
                      user.role === "SUPER_ADMIN"
                        ? "super-admin"
                        : "admin-user"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role !== "SUPER_ADMIN" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
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