import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { navigate, PageProps } from "gatsby";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const RunsPage: React.FC<PageProps<null>> = () => {
  const currentDate = formatDate(
    toZonedTime(new Date(Date.now()), "UTC"),
    "yyyy-MM-dd"
  );

  useEffect(() => {
    navigate(`/runs/${currentDate}`);
  });

  return (
    <div>
      <Helmet>
        <meta httpEquiv="refresh" content={`0; /runs/${currentDate}`} />
      </Helmet>
    </div>
  );
};
export default RunsPage;
