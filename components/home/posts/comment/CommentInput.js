import { useRef, useState, useEffect } from "react";

const CommentInput = ({ postId, posterId }) => {
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
    if (commentRef.current.value.length) {
      try {
        fetch("/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            userId: posterId,
            comment: commentRef.current.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.response === "0") {
              setIsError(true);
              setIsSuccess(false);
              setMessage(data.message);
            } else {
              setIsMessageAvail(true);
              setIsSuccess(true);
              commentRef.current.value = "";
              setMessage("Comment uploaded.");
            }
            setPosting(false);
          });
      } catch (error) {
        setPosting(false);
        setIsMessageAvail(true);
        setMessage("Couldn't put up your post. Please try again.");
      }
    } else {
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
