import { followers } from "../../Mapovers/followers";

const Allfollowers = () => {
  return (
    <div className="w-full shadow-xl pr-2">
      {followers.map((follower) => {
        const { id, name, status } = follower;
        return (
          <div
            key={id}
            className="flex items-center justify-between w-full text-black-100 my-4 p-2 shadow-lg rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-indigo-800 drop-shadow-xl mr-4">
                <p className="font-bold text-3xl  text-transparent bg-clip-text bg-gradient-to-br from-light-400 to-black-200">
                  {name.slice(0, 1).toUpperCase()}
                </p>
              </div>
              <p>{name}</p>
            </div>
            <p
              className={`${
                status === "online" ? "text-green-500" : "text-red-500"
              } text-sm`}
            >
              {status}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Allfollowers;
