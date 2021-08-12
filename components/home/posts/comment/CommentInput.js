import { useRef, useState, useEffect } from "react";
import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/client";

import { db } from "../../../../firebase";

const CommentInput = ({
  postId,
  posterId,
  commentUpdated,
  setCommentUpdated,
}) => {
  const [session] = useSession();
  const commentRef = useRef();

  const [posting, setPosting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    const commentId = uuidv4();
    const params = {
      commentId,
      comment: commentRef.current.value,
      posterId,
      postId,
      likes: 0,
      poster: session.user.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (commentRef.current.value.length) {
      db.collection("comments")
        .add(params)
        .then(() => {
          setCommentUpdated(!commentUpdated);
          setIsMessageAvail(true);
          setIsSuccess(true);
          commentRef.current.value = "";
          setMessage("Comment uploaded.");
        })
        .catch((err) => {
          setIsError(true);
          setIsSuccess(false);
          setMessage("Couldn't upload comment.");
        });
      setPosting(false);
    } else {
      setPosting(false);
      setIsError(true);
      setMessage("Write a comment...");
    }
  };

  return (
    <div className="mt-1">
      {(isError || isMessageAvail) && (
        <div
          className={`bg-transparent ${
            isSuccess ? "text-green-500" : "text-red-500"
          } text-sm font-bold py-2 px-4 flex justify-center items-center mb-4`}
        >
          <p>{message}</p>
        </div>
      )}
      <form className="w-full flex bg-indigo-800">
        <input
          className="w-full pl-4 mr-2 bg-transparent rounded border border-indigo-700 text-black-100 outline-none"
          type="text"
          placeholder="Write a comment..."
          ref={commentRef}
        />
        {posting ? (
          <button
            className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled
          >
            Submitting
          </button>
        ) : (
          <button
            className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
            onClick={(e) => handleSubmit(e)}
          >
            submit
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentInput;
