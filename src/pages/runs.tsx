import { Redirect } from "@reach/router";
import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { PageProps, withPrefix } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const RunsPage: React.FC<PageProps<null>> = () => {
  const currentDate = formatDate(
    toZonedTime(new Date(Date.now()), "UTC"),
    "yyyy-MM-dd"
  );

  return (
    <div>
      <Helmet>
        <meta httpEquiv="refresh" content={`0; /runs/${currentDate}`} />
      </Helmet>
      <Redirect noThrow to={withPrefix(`/runs/${currentDate}`)} />
    </div>
  );
};
export default RunsPage;
