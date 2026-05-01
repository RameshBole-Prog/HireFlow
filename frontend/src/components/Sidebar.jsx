import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUserShield } from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const role = localStorage.getItem("role");

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-3 py-2 rounded ${
      isActive ? "bg-gray-700" : "hover:bg-gray-700"
    }`;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-52"
      } bg-gray-800 text-white min-h-screen p-4 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 text-white"
      >
        <FaBars />
      </button>

      <ul className="space-y-3">

        {/* Dashboard */}
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        {/* Admin */}
        {role === "admin" && (
          <li>
            <NavLink to="/admin" className={linkClass}>
              <FaUserShield />
              {!collapsed && <span>Admin Panel</span>}
            </NavLink>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;