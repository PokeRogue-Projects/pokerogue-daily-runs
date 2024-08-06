import { Link } from "gatsby";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <div className="mx-auto flex justify-center mb-4">
      <div className="space-x-10">
        <Link
          to="../summary"
          className="text-xl font-bold"
          activeClassName="text-blue-500 underline"
        >
          Summary
        </Link>
        <Link
          to="../follow-along"
          className="text-xl font-bold"
          activeClassName="text-blue-500 underline"
        >
          Follow Along
        </Link>
        <Link
          to="../detailed"
          className="text-xl font-bold"
          activeClassName="text-blue-500 underline"
        >
          Detailed
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
