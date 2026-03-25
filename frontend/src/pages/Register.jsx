import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;