import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex shadow-md justify-between py-4 px-6 lg:px-16 bg-transparent backdrop-blur-3xl">
      <div className="flex items-center  space-x-3">
        <Link href="/">
          <img className="w-16 cursor-pointer" src="/logo.png" />
        </Link>
        <h1 className="text-5xl font-bold">Blog</h1>

        <div className="hidden md:flex items-center p-3 space-x-6">
          <h3 className="font-semibold text-xl">About</h3>
          <h3 className="font-semibold text-xl">Contact</h3>
          <h3 className="text-white font-semibold text-xl shadow-2xl cursor-pointer bg-black px-4 py-1 rounded-full">
            {" "}
            Follow
          </h3>
        </div>
      </div>

      <div className="flex cursor-pointer  font-semibold text-lg items-center space-x-5 text-black">
        <h3>Sign In</h3>
        <h3 className="border font-semibold text-lg px-4 py-1 rounded-full cursor-pointer hover:text-white hover:bg-black border-black shadow-2xl">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
