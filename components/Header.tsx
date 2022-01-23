import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header
      className="flex w-full rounded-lg sticky top-0 z-30 shadow-md backdrop-filter: ;
     justify-between py-4 px-6 lg:px-16  backdrop-blur-xl"
    >
      <div className="flex items-center  space-x-3">
        <Link href="/">
          <img className="md:w-16 w-8 cursor-pointer" src="/logo.png" />
        </Link>
        <h1 className="md:text-5xl text-3xl font-bold">Blog</h1>

        <div className="hidden md:flex items-center p-3 px-10 space-x-6">
          <h3 className="font-semibold text-lg ">About</h3>
          <h3 className="font-semibold text-lg ">Contact</h3>
          <h3 className="text-white font-semibold text-xl shadow-2xl cursor-pointer bg-black px-4 py-1 rounded-full">
            {" "}
            Follow
          </h3>
        </div>
      </div>

      <div className="flex cursor-pointer text-xs  font-semibold ms:text-lg items-center space-x-3 md:space-x-5 text-black">
        <h3>Sign In</h3>
        <h3 className="border font-semibold text-center text-xs md:text-lg md:px-4 px-2 py-1 rounded-full cursor-pointer hover:text-white hover:bg-black border-black shadow-2xl">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
