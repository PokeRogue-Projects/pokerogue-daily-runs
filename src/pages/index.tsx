import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ul style={{ listStyleType: "none", paddingLeft: 0, textAlign: "left" }}>
        <li
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Wave 1
        </li>
        {data.allGoogleSpreadsheetFollowAlong.edges.map(
          (edge: any, index: any) => {
            const content = edge.node.wave1;
            if (content) {
              let style = {};
              if (content === "RELOAD YOUR GAME (F5)") {
                style = { color: "red", textDecoration: "underline" };
              } else if (content.startsWith("Shop :")) {
                style = { color: "red" };
              }

              if (content.startsWith("Wave")) {
                return (
                  <li
                    key={index}
                    style={{
                      ...style,
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {content}
                  </li>
                );
              } else {
                return (
                  <li key={index} style={{ ...style, marginBottom: "10px" }}>
                    <input type="checkbox" id={`checkbox-${index}`} />
                    <label
                      htmlFor={`checkbox-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {content}
                    </label>
                  </li>
                );
              }
            }
            return null;
          }
        )}
      </ul>
    </div>
  );
};

export const query = graphql`
  query {
    allGoogleSpreadsheetFollowAlong {
      edges {
        node {
          wave1
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
