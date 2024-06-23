import * as React from "react";
import Navigation from "../components/Navigation";
import type { HeadFC } from "gatsby";

const IndexPage: React.FC = () => {
  return (
    <main>
      <Navigation />
      <div className="centered-content">
        <h1>PokeRogue Projects</h1>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
