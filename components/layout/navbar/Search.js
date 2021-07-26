import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <form className="flex items-center bg-indigo-300 h-3/4 rounded px-3 w-80 ">
        <label htmlFor="search" className="mr-2">
          <FiSearch className="text-black-400 " />
        </label>
        <input
          className="h-full w-full rounded bg-indigo-300 text-indigo-500 outline-indigo-900 block placeholder-black-400 placeholder-opacity-50 outline-none "
          placeholder="Search for posts"
        />
      </form>
    </div>
  );
};

export default Search;
