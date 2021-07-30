import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <form className="flex items-center bg-indigo-700 h-3/4 rounded px-3 w-80 ">
        <label htmlFor="search" className="mr-2">
          <FiSearch className="text-indigo-100" />
        </label>
        <input
          className="h-full w-full rounded bg-indigo-700 outline-indigo-900 block  placeholder-opacity-50 outline-none "
          placeholder="Search for posts"
        />
      </form>
    </div>
  );
};

export default Search;
