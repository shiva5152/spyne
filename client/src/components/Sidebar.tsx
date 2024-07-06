"use client";
import * as React from "react";
import NavItem from "@/components/NavItem";
import type { NavItemProps } from "@/components/NavItem";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
const Sidebar: React.FC = () => {
  return (
    <div className="flex gap-0 mx-auto h-screen">
      <nav className="flex flex-col border-x-[1px] border-zinc-700 grow shrink-0 px-2  text-sm font-bold leading-6 shadow-sm basis-0 bg-neutral-950 text-zinc-400 w-fit">
        <h2 className="self-start text-blue-500 mt-14 ml-4 text-2xl leading-9">
          Social.Io
        </h2>

        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            link={item.link}
          />
        ))}
      </nav>
    </div>
  );
};
export default Sidebar;

const navItems: NavItemProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "Discussions",
    link: "/",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "People",
    link: "/people",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "My Discussions",
    link: "/my-discussions",
  },
];
