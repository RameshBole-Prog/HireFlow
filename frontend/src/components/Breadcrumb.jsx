import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

 return (
  <div className="flex items-center space-x-1 text-gray-500">
    {pathnames.map((value, index) => {
      const path = "/" + pathnames.slice(0, index + 1).join("/");

      return (
        <span key={path} className="flex items-center">
          {index > 0 && <span className="mx-1">/</span>}
          <Link to={path} className="capitalize hover:text-blue-500">
            {value}
          </Link>
        </span>
      );
    })}
  </div>
);
}

export default Breadcrumb;