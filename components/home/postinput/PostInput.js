import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";

import { db } from "../../../firebase";

const PostInput = ({ setPostUpdated, postUpdated }) => {
  const [session] = useSession();

  const [spinner, setSpinner] = useState(false);
  const [isMessageAvail, setIsMessageAvail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const postRef = useRef();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(false);
      setIsMessageAvail(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isError, isMessageAvail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const postId = uuidv4();
    const params = {
      postId,
      content: postRef.current.value,
      poster: session?.user?.name,
      userId: session?.user?.userId,
      userPicture: session?.user?.profilePicture
        ? session.user.profilePicture
        : "",
      likes: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (db) {
      db.collection("posts")
        .add(params)
        .then(() => {
          setPostUpdated(!postUpdated);
          setIsMessageAvail(true);
          setIsSuccess(true);
          postRef.current.value = "";
          setMessage("Post uploaded.");
        })
        .catch((err) => {
          setIsError(true);
          setIsSuccess(false);
          setMessage(err);
        });
      setSpinner(false);
    }
  };

  return (
    <div
      className="mb-4 w-full sticky top-0 bg-indigo-800 p-2 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 shadow-2xl"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {(isError || isMessageAvail) && (
        <div
          className={`bg-transparent ${
            isSuccess ? "text-green-500" : "text-red-500"
          } text-sm font-bold py-2 px-4 flex justify-center items-center mb-4`}
        >
          <p>{message}</p>
        </div>
      )}
      <form className="flex flex-col justify-center items-center mt-5">
        <div className="w-full h-9 rounded">
          <input
            type="text"
            placeholder="Say something..."
            ref={postRef}
            className="w-full h-full px-4 rounded border-none outline-none bg-indigo-700 text-black-100"
          />
        </div>
        <div className="w-full flex justify-end">
          {spinner ? (
            <button
              className="bg-green-500 text-white px-5 py-1 rounded mt-3 text-base disabled:bg-green-300 disabled:cursor-not-allowed"
              disabled
            >
              <p className="mr-3">Posting...</p>
            </button>
          ) : (
            <button
              className="text-green-500 border border-green-500 px-5 py-1 rounded mt-3 text-sm"
              onClick={(e) => handleSubmit(e)}
            >
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostInput;
