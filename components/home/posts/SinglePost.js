import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSession } from "next-auth/client";

import Comment from "./Comment";

const SinglePost = ({ poster, postId, likes, content, posterId }) => {
  const [session] = useSession();

  const [wantToComment, setWantToComment] = useState(false);

  return (
    <div className="shadow-2xl bg-indigo-800 text-black-100 rounded-lg px-4 py-5 my-6 text-sm">
      <div className="bg-indigo-800 flex items-center border-b border-indigo-700 pb-1">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white mr-3">
          <p>A</p>
        </div>
        <p>{poster}</p>
      </div>
      <div>
        <p className="py-2">{content}</p>
        <div className="h-h w-full bg-indigo-700"></div>
        {wantToComment && (
          <Comment postId={postId} posterId={session?.user?.userId} />
        )}
        <div className="w-full flex justify-end mt-1 text-xs">
          <button className="flex mr-4 items-center font-bold  py-1 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-black-100 transition-all">
            <p
              className="mr-1"
              onClick={() => setWantToComment(!wantToComment)}
            >
              Comment
            </p>
            <FaComments className="text-base" />
          </button>
          <button className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all">
            <span>{likes}</span>
            <p className="mx-1">Like(s)</p>
            <BiLike className="text-base" />
          </button>
          {session?.user?.userId === posterId && (
            <button className="flex items-center font-bold  py-1 px-3 rounded text-black-100 bg-transparent hover:bg-red-500 transition-all">
              <RiDeleteBin5Line className="text-base" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
