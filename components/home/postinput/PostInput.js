const PostInput = () => {
  return (
    <div
      className="mb-4 w-full sticky top-0 bg-indigo-800 p-2 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 shadow-2xl"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <form className="flex flex-col justify-center items-center mt-5">
        <div className="w-full h-9 rounded">
          <input
            type="text"
            placeholder="Say something..."
            className="w-full h-full px-4 rounded border-none outline-none bg-indigo-700"
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
          <button className="bg-green-500 text-white px-5 py-1 rounded mt-3 text-base">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInput;
