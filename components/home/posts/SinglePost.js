import { FaComments } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

const SinglePost = ({ owner, pic, comments, likes, thepost }) => {
  return (
    <div className="border bg-indigo-800 text-white rounded-lg px-4 py-5 my-6 text-sm">
      <div className="bg-indigo-800 flex items-center border-b border-indigo-700 pb-1">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white mr-3">
          <p>A</p>
        </div>
        <p>{owner}</p>
      </div>
      <div>
        <p className="py-2">
          {/* <RiDoubleQuotesL /> */}
          <span>{thepost}</span>
          {/* <RiDoubleQuotesR /> */}
        </p>
        <div className="h-h w-full bg-indigo-700"></div>
        <div className="w-full flex justify-end mt-1 text-xs">
          <button className="flex mr-4 items-center font-bold  py-1 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <p className="mr-1">Comment</p>
            <FaComments className="text-base" />
          </button>
          <button className="flex items-center font-bold  py-1 px-3 rounded text-green-500 hover:bg-green-500 hover:text-white transition-all">
            <p className="mr-1">Like</p>
            <BiLike className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
