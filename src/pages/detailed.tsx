import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";

const DetailedPage: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <Navigation />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul
          style={{ listStyleType: "none", paddingLeft: 0, textAlign: "left" }}
        >
          {data.allGoogleSpreadsheetDetailed.edges.map(
            (edge: any, index: any) => {
              if (edge.node.name) {
                return (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>Name:</strong> {edge.node.name}
                    <br />
                    <strong>Stage:</strong> {edge.node.stage}
                    <br />
                    <strong>Nature:</strong> {edge.node.nature}
                    <br />
                    <strong>Steps:</strong> {edge.node.steps__Guide}
                  </li>
                );
              }
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    allGoogleSpreadsheetDetailed {
      edges {
        node {
          name
          stage
          nature
          steps__Guide
        }
      }
    }
  }
`;

export default DetailedPage;
