import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4">
      <h1 className="text-lg font-bold">HireFlow</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;