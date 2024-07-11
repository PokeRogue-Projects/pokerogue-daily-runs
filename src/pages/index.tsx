import * as React from "react";
import { useState } from "react";
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
import DatePicker from "@/components/DatePicker";
import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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
  const [date, setDate] = useState<Date>(toZonedTime(new Date(Date.now()), "UTC"));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available DRPD Pages</h1>
        <DatePicker className="min-w-[300px] w-1/5 mb-3" date={date} onDateChange={setDate} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drpdPages
            .filter(({ node }) => node.date === formatDate(date, "yyyy-MM-dd"))
            .map(({ node }) => (
              <Card key={node.parent.name}>
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
