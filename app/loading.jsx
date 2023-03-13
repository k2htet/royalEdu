"use client";
import { ProgressBar } from "react-loader-spinner";

const PageLoading = () => {
  return (
    <div className={` min-h-screen flex justify-center items-center`}>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperClass="progress-bar-wrapper"
        borderColor="#6610F2"
        barColor="#161616"
      />
    </div>
  );
};

export default PageLoading;
