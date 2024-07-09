import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drpdPages.map(({ node }, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{node.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Date: {node.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  Authors: {node.authors.join(", ")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link to={`/${node.parent.name.replace(/_/g, "-")}/detailed`}>
                    Detailed
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    to={`/${node.parent.name.replace(/_/g, "-")}/follow-along`}
                  >
                    Follow Along
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
