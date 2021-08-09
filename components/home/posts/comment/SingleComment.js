import { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSession } from "next-auth/client";

const SingleComment = ({
  postId,
  posterId,
  poster,
  commentId,
  comment,
  likes,
  mutate,
}) => {
  const [session] = useSession();
  const userId = session.user.userId;

  const [liking, setLiking] = useState(false);
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
    try {
      fetch("/api/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          commentId: commentId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response === "0") {
            setIsError(true);
            setIsSuccess(false);
            setMessage(data.message);
            mutate({
              data: { ...data },
              likes: likes + 1,
            });
          } else {
            setIsMessageAvail(true);
            setIsSuccess(true);
            setMessage("Post liked.");
          }
          setLiking(false);
        });
    } catch (error) {
      setLiking(false);
      setIsMessageAvail(true);
      setMessage("Couldn't put up your post. Please try again.");
    }
  };
  return (
    <div className="shadow-2xl bg-indigo-800 text-black-100 rounded-lg px-4 py-7 my-6 text-sm">
      <div className="bg-indigo-800 flex items-center border-b border-indigo-700 pb-1">
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-600 mr-3">
          <p>A</p>
        </div>
        <p>{poster}</p>
      </div>
      <div>
        <p className="py-2">{comment}</p>
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
          {liking ? (
            <button
              className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
              disabled
            >
              <p className="mx-1">Liking</p>
              <BiLike className="text-base" />
            </button>
          ) : (
            <button
              className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all"
              onClick={(e) => handleLike(e)}
            >
              <span>{likes}</span>
              <p className="mx-1">Like(s)</p>
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
      </div>
    </div>
  );
};

export default SingleComment;
