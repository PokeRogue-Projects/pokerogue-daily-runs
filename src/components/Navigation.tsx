import * as React from "react";
import { Link } from "gatsby";

const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  return (
    <nav className="bg-gray-100 py-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <NavLink to="/follow-along" currentPage={currentPage}>
            Follow Along
          </NavLink>
        </li>
        <li>
          <NavLink to="/" currentPage={currentPage}>
            Detailed
          </NavLink>
        </li>
        <li>
          <NavLink to="/detailed-slides" currentPage={currentPage}>
            Slides
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const NavLink: React.FC<{
  to: string;
  currentPage: string;
  children: React.ReactNode;
}> = ({ to, currentPage, children }) => {
  const currentPath = "/" + currentPage;
  const isActive =
    currentPath === to || (to === "/" && currentPage === "detailed");
  return (
    <Link
      to={to}
      className={`text-gray-700 hover:text-blue-600 font-medium py-2 px-1 border-b-2 transition-colors duration-200 ${
        isActive
          ? "text-blue-600 border-blue-600"
          : "border-transparent hover:border-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navigation;
