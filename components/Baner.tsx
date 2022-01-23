import React from "react";

function Baner() {
  return (
    <div className="flex justify-between    lg:px-5 items-center   bg-transparent backdrop-blur-xl shadow-xl md:py-10 py-5 lg:py-3 ">
      <div className="md:px-10 px-5 md:space-y-5 space-y-3 ">
        <h1 className="md:text-6xl text-4xl max-w-xl font-serif">
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
