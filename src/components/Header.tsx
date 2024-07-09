import { Link } from "gatsby";
import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <>
      <div className="container mx-auto">
        <nav className="flex justify-between py-3 ">
          <div className="uppercase font-bold">Pokerogue Daily Runs</div>
          <div className="flex gap-4 items-center">
            <Link to="/">Homepage</Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
