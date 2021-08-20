import { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSession } from "next-auth/client";

import { db } from "../../../../firebase";

const SingleComment = ({
  posterId,
  poster,
  commentId,
  comment,
  likes,
  docId,
  setCommentUpdated,
  commentUpdated,
}) => {
  const [session] = useSession();
  const userId = session.user.userId;

  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isMessageAvail, setIsMessageAvail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(false);
      setIsMessageAvail(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isError, isMessageAvail]);

  const handleLike = (e) => {
    e.preventDefault();
    setLiking(true);
    db.collection("comments")
      .doc(docId)
      .update({ likes: likes + 1 })
      .then(() => {
        setLiking(false);
        setIsSuccess(true);
        setIsError(false);
        setMessage("Like added");
        setCommentUpdated(!commentUpdated);
        setLiked(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsSuccess(false);
        setMessage("Comment not liked.");
        setLiking(false);
      });
  };

  const handleUnLike = (e) => {
    e.preventDefault();
    setLiking(true);
    db.collection("comments")
      .doc(docId)
      .update({ likes: likes - 1 })
      .then(() => {
        setLiking(false);
        setIsSuccess(true);
        setIsError(false);
        setMessage("Like added");
        setCommentUpdated(!commentUpdated);
        setLiked(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsSuccess(false);
        setMessage("Comment not unliked.");
        setLiking(false);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleting(true);
    const postQuery = db
      .collection("comments")
      .where("commentId", "==", commentId);
    postQuery
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          setIsSuccess(true);
          setDeleting(false);
          setCommentUpdated(!commentUpdated);
        });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsMessageAvail(true);
        setMessage("Couldn't delete comment. Please try again.");
        setDeleting(false);
      });
  };
  return (
    <div className="shadow-2xl bg-indigo-700 text-black-100 rounded-lg px-4 py-7 my-6 text-sm">
      <div className="bg-indigo-700 flex items-center border-b border-indigo-800 pb-1">
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-600 mr-3">
          <p>{poster.slice(0, 1).toUpperCase()}</p>
        </div>
        <p>{poster}</p>
      </div>
      <div>
        <p className="py-2">{comment}</p>
        <div className="h-h w-full bg-indigo-800"></div>
        {(isError || isMessageAvail) && (
          <div
            className={`bg-transparent ${
              isSuccess ? "text-green-500" : "text-red-500"
            } text-sm font-bold py-2 px-4 flex justify-center items-center mb-4`}
          >
            <p>{message}</p>
          </div>
        )}
        <div className="w-full flex justify-end mt-1 text-xs">
          {liking ? (
            <button
              className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
              disabled
            >
              <span>{likes}</span>
              <BiLike className="text-base ml-1" />
            </button>
          ) : (
            <>
              {!liked ? (
                <button
                  className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
                  onClick={(e) => handleLike(e)}
                >
                  <span>{likes}</span>
                  <BiLike className="text-base ml-1" />
                </button>
              ) : (
                <button
                  className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
                  onClick={(e) => handleUnLike(e)}
                >
                  <span>{likes}</span>
                  <BiLike className="text-base ml-1" />
                </button>
              )}
            </>
          )}
          {session?.user?.userId === posterId && (
            <>
              {deleting ? (
                <button
                  className="flex items-center font-bold  py-1 px-3 rounded text-black-100 bg-transparent hover:bg-red-500 transition-all disabled:hover:bg-red-300"
                  disabled
                >
                  <RiDeleteBin5Line className="text-base" />
                </button>
              ) : (
                <button
                  className="flex items-center font-bold  py-1 px-3 rounded text-black-100 bg-transparent hover:bg-red-500 transition-all"
                  onClick={(e) => handleDelete(e)}
                >
                  <RiDeleteBin5Line className="text-base" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
