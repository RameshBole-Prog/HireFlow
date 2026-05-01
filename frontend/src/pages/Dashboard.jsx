import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getUserStats } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  // 🔹 Fetch admin stats
  useEffect(() => {
    if (user?.role === "admin") {
      getUserStats()
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // 🔄 Loading state
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* 🔥 Header */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user.name} 👋
      </h2>

      {/* 🔥 Profile Card */}
      <div className="bg-white p-6 rounded-lg shadow-md w-80 mb-6">
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          <span className="capitalize">{user.role}</span>
        </p>
      </div>

      {/* 🔥 Admin Stats */}
      {user.role === "admin" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white p-5 shadow rounded-lg">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold">
              {stats.totalUsers}
            </h3>
          </div>

          <div className="bg-white p-5 shadow rounded-lg">
            <p className="text-gray-500 text-sm">Admins</p>
            <h3 className="text-2xl font-bold">
              {stats.admins}
            </h3>
          </div>

          <div className="bg-white p-5 shadow rounded-lg">
            <p className="text-gray-500 text-sm">Employees</p>
            <h3 className="text-2xl font-bold">
              {stats.employees}
            </h3>
          </div>

        </div>
      )}
    </div>
  );
}

export default Dashboard;