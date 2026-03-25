import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  if (!user) return <p>Loading...</p>;


 return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
    </div>
  </div>
);

}

export default Dashboard;