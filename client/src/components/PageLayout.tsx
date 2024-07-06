"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getUser } from "@/redux/features/user/api";
import { getDiscussions } from "@/redux/features/discussion/api";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(dispatch);
    getDiscussions(dispatch);
  }, []);

  return (
    <main className=" min-h-screen flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] flex flex-col bg-black">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
