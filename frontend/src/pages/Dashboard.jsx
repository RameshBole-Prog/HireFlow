import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await getProfile(token);
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;