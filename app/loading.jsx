import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: " 100px auto",
};
const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      size={150}
      aria-label="Laoding Spinner"
      cssOverride={override}
    />
  );
};

export default LoadingPage;
