import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "@/components/Layout";

type DrpdEdge = {
  node: {
    parent: {
      name: string;
    };
    title: string;
    date: string;
    authors: string[];
  };
};

const IndexPage: React.FC<{ data: { allDrpdJson: { edges: DrpdEdge[] } } }> = ({
  data,
}) => {
  const drpdPages = data.allDrpdJson.edges;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available DRPD Pages</h1>
        <ul className="space-y-4">
          {drpdPages.map(({ node }, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-xl font-semibold">{node.title}</p>
              <Link
                to={`/${node.parent.name.replace(/_/g, "-")}/detailed`}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                Detailed
              </Link>
              <Link
                to={`/${node.parent.name.replace(/_/g, "-")}/follow-along`}
                className="text-blue-600 hover:text-blue-800"
              >
                Follow Along
              </Link>
              <p className="text-gray-600 mt-2">Date: {node.date}</p>
              <p className="text-gray-600">
                Authors: {node.authors.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allDrpdJson {
      edges {
        node {
          parent {
            ... on File {
              name
            }
          }
          title
          date
          authors
        }
      }
    }
  }
`;

export default IndexPage;
