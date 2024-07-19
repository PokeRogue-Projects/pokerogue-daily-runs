import Layout from "@/components/Layout";
import { ReloadAlert } from "@/components/ReloadAlert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isMatch } from "date-fns";
import { graphql, Link, navigate, PageProps } from "gatsby";
import React, { useEffect } from "react";

const RunsPage: React.FC<PageProps<Queries.RunsPageQuery>> = ({
  data,
  params,
}) => {
  const drpdJsons = data.allDrpdJson.edges;
  const date = params.date;
  
  const drpdJsonsToDisplay = drpdJsons.filter(({ node }) => node.date === date);

  useEffect(() => {
    if (date === undefined || !isMatch(date, "yyyy-MM-dd")) navigate("/");
  }, []);

  return (
    date !== undefined &&
    isMatch(date, "yyyy-MM-dd") && (
      <Layout date={date}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">
            Available Runs for {date}
          </h1>
          <div className="space-y-4">
            {drpdJsonsToDisplay.length !== 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {drpdJsonsToDisplay
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
            )}
            <ReloadAlert />
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
