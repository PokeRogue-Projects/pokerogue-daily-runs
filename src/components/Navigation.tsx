import * as React from "react";
import { Link } from "gatsby";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-100 py-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/follow-along">Follow Along</NavLink>
        </li>
        <li>
          <NavLink to="/detailed">Detailed</NavLink>
        </li>
        <li>
          <NavLink to="/slides">Slides</NavLink>
        </li>
      </ul>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-blue-600 font-medium py-2 px-1 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
    activeClassName="text-blue-600 border-blue-600"
  >
    {children}
  </Link>
);

export default Navigation;
