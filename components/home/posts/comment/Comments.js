import { useState, useEffect } from "react";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Loader from "../../../utils/Loader";
import { db } from "../../../../firebase";

const Comments = ({ postId, posterId, setCommentLength }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  //to update comment
  const [commentUpdated, setCommentUpdated] = useState(false);

  const deletePost = (id) => {
    const newComments = comments.filter((comment) => comment.commentId !== id);
    setComments(newComments);
  };

  useEffect(() => {
    let theComments = [];
    setLoading(true);
    const unsubscribe = db
      .collection("comments")
      .where("postId", "==", postId)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc;
          if (change.type === "added") {
            theComments.push({ ...doc.data(), theid: doc.id });
          } else if (change.type === "removed") {
            deletePost(doc.id);
          }
        });
        setComments(theComments);
        setCommentLength(theComments.length);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [commentUpdated]);

  if (loading) {
    return (
      <div className="mt-4 flex flex-col justify-center">
        <div className="flex mb-4 items-center">
          <p>Loading comments</p> <Loader />
        </div>
        <CommentInput postId={postId} posterId={posterId} />
      </div>
    );
  }

  if (comments < 1) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">No comment has been created.</p>
        <CommentInput postId={postId} posterId={posterId} />
      </div>
    );
  }

  return (
    <div className="max-h-screen overflow-hidden">
      <CommentInput
        postId={postId}
        posterId={posterId}
        commentUpdated={commentUpdated}
        setCommentUpdated={setCommentUpdated}
      />
      <Comment
        comments={comments}
        commentUpdated={commentUpdated}
        setCommentUpdated={setCommentUpdated}
      />
    </div>
  );
};

export default Comments;
