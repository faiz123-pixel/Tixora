import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  createSuperUser,
} from "../services/userService";
import "./css/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSuperUser(form);
    setForm({ name: "", email: "" });
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

      {/* Create Super Admin Form */}
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <button type="submit">Create Super Admin</button>
      </form>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
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
                <td>{user.email}</td>
                <td>
                  <span
                    className={`role-badge ${
                      user.role === "SUPER_ADMIN"
                        ? "super-admin"
                        : "normal-user"
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
