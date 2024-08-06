import { Link } from "gatsby";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <div className="mx-auto flex justify-center">
      <div className="flex w-[90%] md:w-1/2 justify-around">
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
