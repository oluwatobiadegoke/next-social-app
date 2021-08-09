import useSWR from "swr";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Loader from "../../../utils/Loader";

const Comments = ({ postId, posterId }) => {
  const {
    data: data,
    error,
    mutate,
  } = useSWR(`/api/comments/${postId}/${posterId}`);

  if (error) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">
          Error! Couldn't fetch comments. Please refresh the page or try again
          later
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-4 flex flex-col justify-center">
        <div className="flex mb-4 items-center">
          <p>Loading comments</p> <Loader />
        </div>
        <CommentInput postId={postId} posterId={posterId} />
      </div>
    );
  }

  if (data.data < 1) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">No comment has been created.</p>
        <CommentInput postId={postId} posterId={posterId} />
      </div>
    );
  }

  return (
    <div className="max-h-screen overflow-hidden">
      <CommentInput postId={postId} posterId={posterId} />
      <Comment comments={data.data} mutate={mutate} />
    </div>
  );
};

export default Comments;
