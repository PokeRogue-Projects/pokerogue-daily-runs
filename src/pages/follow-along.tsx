import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { determineStyle } from "../utils/styleUtils";

const FollowAlongPage: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <Navigation currentPage="follow-along" />
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
          {data.allGoogleSpreadsheetFollowAlong.edges.map(
            (edge: any, index: any) => {
              const content = edge.node.wave;
              const style = determineStyle(content);

              return (
                <li key={index} style={{ ...style, marginBottom: "10px" }}>
                  {content.startsWith("Wave") ? (
                    <strong>{"Stage" + content.slice(4)}</strong>
                  ) : (
                    <>
                      <input type="checkbox" id={`checkbox-${index}`} />
                      <label
                        htmlFor={`checkbox-${index}`}
                        style={{ marginLeft: "8px" }}
                      >
                        {content}
                      </label>
                    </>
                  )}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    allGoogleSpreadsheetFollowAlong {
      edges {
        node {
          wave
        }
      }
    }
  }
`;

export default FollowAlongPage;
