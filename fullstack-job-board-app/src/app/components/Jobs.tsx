import React from "react";
import JobRow from "./JobRow";

const Jobs = () => {
  return (
    <div className="bg-gray-200 py-4 rounded-3xl w-full">
      <div className="container">
        {" "}
        <div className="container font-bold mb-4">Recent Jobs</div>
        <div className="flex flex-col gap-4">
          <JobRow />
          <JobRow />
          <JobRow />
          <JobRow />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
