import React from "react";
import { Link } from "gatsby";

export default function Footer() {
  return (
    <>
      <div className="container text-center">
        <p className="border-t border-slate-400 dark:border-slate-700 pt-5">
          PokeRogue Projects{" "}
          <Link to="https://google.com" target="_blank">
            link to discord if we want it
          </Link>
        </p>
      </div>
    </>
  );
}
