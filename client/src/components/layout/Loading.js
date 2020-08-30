import React, { Fragment } from "react";
import loading from "../../img/loading.gif";

const Loading = () => {
  return (
    <Fragment>
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Loading;
