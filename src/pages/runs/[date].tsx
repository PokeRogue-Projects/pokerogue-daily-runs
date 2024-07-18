import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Redirect } from "@reach/router";
import { isMatch } from "date-fns";
import { graphql, Link, navigate, PageProps, withPrefix } from "gatsby";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const RunsPage: React.FC<PageProps<Queries.RunsPageQuery>> = ({
  data,
  params,
}) => {
  const drpdPages = data.allDrpdJson.edges;
  const date = params.date;

  useEffect(() => {
    if (date === undefined || !isMatch(date, "yyyy-MM-dd")) navigate("/");
  }, []);

  return (
    date !== undefined &&
    isMatch(date, "yyyy-MM-dd") && (
      <Layout date={date}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">
            Available DRPD Pages for {date}
          </h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drpdPages
              .filter(({ node }) => node.date === date)
              .map(({ node }) => (
                <Card key={node.uuid}>
                  <CardHeader>
                    <CardTitle>{node.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Date: {date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Authors: {node.authors.join(", ")}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link to={`./${node.label}/detailed`}>Detailed</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={`./${node.label}/follow-along`}>
                        Follow Along
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </Layout>
    )
  );
};

export const query = graphql`
  query RunsPage {
    allDrpdJson {
      edges {
        node {
          title
          uuid
          label
          date
          authors
        }
      }
    }
  }
`;

export default RunsPage;
