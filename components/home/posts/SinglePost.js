import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import firebase from "firebase/app";

import Comments from "./comment/Comments";
import Loader from "../../utils/Loader";
import { db } from "../../../firebase";

const SinglePost = ({
  poster,
  postId,
  likes,
  content,
  posterId,
  setPostUpdated,
  postUpdated,
  docId,
}) => {
  const [session] = useSession();
  const user = session.user.userId;

  const [commentLength, setCommentLength] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(false);
      setIsMessageAvail(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isError, isMessageAvail]);

  const [wantToComment, setWantToComment] = useState(false);
  const [liking, setLiking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isMessageAvail, setIsMessageAvail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleLike = (e) => {
    e.preventDefault();
    setLiking(true);
    db.collection("posts")
      .doc(docId)
      .update({ likes: likes + 1 })
      .then(() => {
        setLiking(false);
        setIsSuccess(true);
        setIsError(false);
        setMessage("Like added");
        setPostUpdated(!postUpdated);
      })
      .catch((error) => {
        setIsError(true);
        setIsSuccess(false);
        setMessage("Post not liked.");
        setLiking(false);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleting(true);
    const postQuery = db.collection("posts").where("postId", "==", postId);
    postQuery
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          setIsSuccess(true);
          setDeleting(false);
          setPostUpdated(!postUpdated);
        });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsMessageAvail(true);
        setMessage("Couldn't delete your post. Please try again.");
        setDeleting(false);
      });
  };

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
          <button
            className="flex mr-4 items-center font-bold  py-1 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-black-100 transition-all"
            onClick={() => setWantToComment(!wantToComment)}
          >
            <p className="mr-1">{commentLength ? commentLength : 0}</p>
            <FaComments className="text-base" />
          </button>
          {liking || posterId === session.user.userId ? (
            <button
              className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all disabled:cursor-not-allowed"
              disabled
            >
              <span>{likes}</span>
              <BiLike className="text-base" />
            </button>
          ) : (
            <button
              className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
              onClick={(e) => handleLike(e)}
            >
              <span>{likes}</span>
              <BiLike className="text-base" />
            </button>
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
        {wantToComment && (
          <Comments
            postId={postId}
            posterId={user}
            setCommentLength={setCommentLength}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
