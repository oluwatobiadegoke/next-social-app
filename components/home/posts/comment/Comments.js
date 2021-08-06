import { useState, useEffect } from "react";
import useSWR from "swr";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Loader from "../../../utils/Loader";

const Comments = ({ postId, posterId }) => {
  const [comments, setComments] = useState();

  const { data: data, error } = useSWR(`/api/comments/${postId}/${posterId}`);

  useEffect(() => {
    if (data) {
      setComments(data.data);
    }
  }, [data]);

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

  if (!comments) {
    return (
      <div className="mt-4 flex justify-center">
        <p>Loading comments</p> <Loader />
      </div>
    );
  }

  if (comments.length < 1) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">
          There are currently no comments available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <CommentInput postId={postId} posterId={posterId} />
      <Comment comments={comments} />
    </div>
  );
};

export default Comments;
