import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { navigate, PageProps, withPrefix } from "gatsby";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const RunsPage: React.FC<PageProps<null>> = () => {
  const currentDate = formatDate(
    toZonedTime(new Date(Date.now()), "UTC"),
    "yyyy-MM-dd"
  );

  useEffect(() => {
    navigate(`/runs/${currentDate}`);
  }, []);

  return <div></div>;
};
export default RunsPage;
