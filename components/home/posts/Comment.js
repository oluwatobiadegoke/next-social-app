import { useRef } from "react";

const Comment = () => {
  const commentRef = useRef();

  return (
    <div className="mt-1">
      <form className="w-full flex bg-indigo-800">
        <input
          className="w-full pl-4 mr-2 bg-transparent rounded border border-indigo-700 outline-none"
          type="text"
          placeholder="Write a comment..."
          ref={commentRef}
        />
        <button className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-black-100 transition-all">
          submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
