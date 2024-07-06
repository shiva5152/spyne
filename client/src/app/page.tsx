"use client";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Discussion from "@/components/Discussion";
import { useAppSelector } from "@/redux/hooks";
import CommentPopup from "@/components/Popups/Comment";

export default function Home() {
  const { discussions, loading } = useAppSelector((state) => state.discussion);
  const { currUser } = useAppSelector((state) => state.user);
  const { isCommentPopup } = useAppSelector((state) => state.ui);

  return (
    <PageLayout>
      <div className=" flex justify-center my-10 items-center w-full ">
        <div className="flex flex-col gap-4 ">
          {[...discussions, ...discussions].map((discussion) => (
            <Discussion
              key={discussion._id}
              discussion={discussion}
              userId={currUser?._id || ""}
            />
          ))}
        </div>
        {isCommentPopup && <CommentPopup />}
      </div>
    </PageLayout>
  );
}
