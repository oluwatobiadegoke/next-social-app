const PostInput = () => {
  return (
    <div className="mb-4 w-full">
      <form className="flex flex-col justify-center items-center mt-5">
        <div className="w-full border-2 border-indigo-800 h-9 rounded">
          <input
            type="text"
            placeholder="Say something..."
            className="w-full h-full px-4 rounded "
          />
        </div>
        {/* <div>
          <div>
            <label htmlFor="image">Add Image</label>
            <input type="file" />
          </div>
          <div>
            <label htmlFor="image">Add Audio</label>
            <input type="file" />
          </div>
          <div>
            <label htmlFor="image">Add Video</label>
            <input type="file" />
          </div>
        </div> */}
        <div className="w-full flex justify-end">
          <button className="bg-green-500 text-white px-5 py-1 rounded mt-3">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInput;
