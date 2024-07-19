import React from "react";

export const NoRefreshHead: React.FC = () => (
  <>
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />
  </>
);
