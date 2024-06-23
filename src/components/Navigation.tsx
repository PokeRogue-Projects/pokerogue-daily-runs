import * as React from "react";
import { Link } from "gatsby";

const Navigation: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Link
        to="/"
        activeClassName="active-link"
        style={{ marginRight: "10px" }}
      >
        Home
      </Link>
      <Link
        to="/follow-along"
        activeClassName="active-link"
        style={{ marginRight: "10px" }}
      >
        Follow Along
      </Link>
      <Link to="/detailed" activeClassName="active-link">
        Detailed
      </Link>
    </div>
  );
};

export default Navigation;
