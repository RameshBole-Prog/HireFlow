import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../services/userService";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);


    const handleEdit = (user) => {
        setEditUser(user);

        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
        });

        setEditModal(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await updateUser(editUser._id, formData);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === editUser._id ? res.data.user : u
                )
            );

            setEditModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    // 🗑 Open Modal
    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    // ❌ Confirm Delete
    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUserId);

            setUsers((prev) =>
                prev.filter((u) => u._id !== selectedUserId)
            );

            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

                <table className="w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center border-t">
                                <td className="p-2">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>

                                <td className="space-x-3">
                                    {/* ✏️ Edit */}
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    >
                                        <FaEdit />
                                    </button>

                                    {/* 🗑 Delete */}
                                    <button
                                        onClick={() => handleDeleteClick(user._id)}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔥 CUSTOM MODAL */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-bold mb-4">
                            Confirm Delete
                        </h3>

                        <p className="mb-6">
                            Are you sure you want to delete this user?
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✏️ EDIT MODAL */}
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Edit User</h3>

                        {/* Name */}
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mb-3 p-2 border rounded"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                            className="w-full mb-3 p-2 border rounded"
                        />

                        {/* Role */}
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded"
                        >
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                            <option value="admin">Admin</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setEditModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;