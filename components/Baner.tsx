import React from "react";

function Baner() {
  return (
    <div className="flex justify-between rounded-b-md shadow  lg:px-5 items-center  bg-slate-500 py-10 lg:py-3 ">
      <div className="px-10 space-y-5 ">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4">
            M Blog
          </span>{" "}
          is a place to write, read, and connect
        </h1>
        <h2>
          It's a place where you can share your knowledge, thoughts, and
          experiences with millions of other people.
        </h2>
      </div>
      <img src="/logo.png" className="hidden md:inline-flex h-32 lg:h-64" />
    </div>
  );
}

export default Baner;
