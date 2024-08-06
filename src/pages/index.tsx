import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { navigate, PageProps } from "gatsby";
import React, { useEffect } from "react";

const IndexPage: React.FC<PageProps<null>> = () => {
  const currentDate = formatDate(
    toZonedTime(new Date(Date.now()), "UTC"),
    "yyyy-MM-dd",
  );

  useEffect(() => {
    navigate(`/runs/${currentDate}`);
  }, []);

  return <div></div>;
};
export default IndexPage;
