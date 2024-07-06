"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
  icon: string;
  label: string;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, link }) => {
  const pathName = usePathname();
  console.log(pathName, "pathName");
  console.log(link, "link");

  return (
    <Link
      href={link}
      className={cn(
        "flex flex-col justify-center px-4 py-2 mt-4 w-full whitespace-nowrap bg-neutral-950",
        pathName === link && " text-white"
      )}
    >
      <div className="flex gap-2">
        <img src={icon} alt="" className="shrink-0 w-6 aspect-square" />
        <div className="flex-auto">{label}</div>
      </div>
    </Link>
  );
};

export default NavItem;
