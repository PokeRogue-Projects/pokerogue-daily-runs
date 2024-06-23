import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
  const [activeTab, setActiveTab] = React.useState("followAlong");

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("followAlong")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            border: "none",
            borderBottom:
              activeTab === "followAlong" ? "2px solid blue" : "1px solid grey",
            backgroundColor:
              activeTab === "followAlong" ? "#f0f0f0" : "#e0e0e0",
            cursor: "pointer",
          }}
        >
          Follow Along
        </button>
        <button
          onClick={() => setActiveTab("detailed")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderBottom:
              activeTab === "detailed" ? "2px solid blue" : "1px solid grey",
            backgroundColor: activeTab === "detailed" ? "#f0f0f0" : "#e0e0e0",
            cursor: "pointer",
          }}
        >
          Detailed
        </button>
      </div>

      {activeTab === "followAlong" && (
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
                      <li
                        key={index}
                        style={{ ...style, marginBottom: "10px" }}
                      >
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
      )}

      {activeTab === "detailed" && (
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
                return null;
              }
            )}
          </ul>
        </div>
      )}
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

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
