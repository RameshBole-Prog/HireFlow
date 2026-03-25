import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      // 🔥 Store token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login to HireFlow</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </form>
  </div>
);
}

export default Login;