"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const Header = () => {
  const { currUser } = useAppSelector((state) => state.user);

  return (
    <div className="flex h-[12vh] justify-center items-center px-16 py-4 text-base text-center text-gray-300 border-b border-solid backdrop-blur bg-zinc-900 bg-opacity-90 border-neutral-700 max-md:px-5">
      <div className="flex gap-5 justify-between max-w-full w-[1280px] max-md:flex-wrap">
        <div className="flex max-md:hidden gap-5 my-auto max-md:flex-wrap">
          <div>Followers :{currUser?.followers.length || 0}</div>
          <div>Following :{currUser?.following.length || 0} </div>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Create +
          </button>
          <div className="flex text-white font-medium justify-center items-center">
            {currUser?.name || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
