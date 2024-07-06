import { TDiscussion } from "@/types/discussion";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikeApi } from "@/redux/features/discussion/api";
import { setCommentPopup } from "@/redux/features/ui/slice";
import { useRouter } from "next/navigation";
import CommentPopup from "./Popups/Comment";

const Discussion = ({
  discussion,
  userId,
}: {
  discussion: TDiscussion;
  userId: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    await toggleLikeApi(dispatch, discussion._id);
    setLoading(false);
  };
  const isLiked = discussion.likes.includes(userId);

  const handleComment = () => {
    router.push(`/?discussion=${discussion._id}`);
    dispatch(setCommentPopup(true));
  };
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={discussion?.image || ""}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {discussion?.text || ""}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {discussion?.hashtags.map((hashtag) => (
            <span key={hashtag} className="mr-1 text-blue-500">
              #{hashtag}
            </span>
          ))}
        </p>
        <div className="flex items-center justify-between">
          <button
            className="flex gap-1"
            disabled={loading}
            onClick={handleLike}
          >
            <span>{discussion.likes.length}</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isLiked ? "#DE3163" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
          </button>
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
