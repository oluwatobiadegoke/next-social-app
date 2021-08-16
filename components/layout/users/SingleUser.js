import { IoChatbubblesOutline } from "react-icons/io5";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/client";

import { db } from "../../../firebase";

const SingleUser = ({ userId, name }) => {
  const [session] = useSession();
  const user = session.user.name;

  const [snapshot] = useCollectionOnce(
    db.collection("chats").where("users", "array-contains", name)
  );

  const checkIfAlreadyInChat = (chatWith) => {
    return (
      !!snapshot?.docs.find((chat) =>
        chat.data().users.find((user) => user === chatWith)
      )?.length > 0
    );
  };

  const createChat = (chatWith) => {
    if (!checkIfAlreadyInChat(chatWith) && user !== chatWith) {
      db.collection("chats").add({
        user: [user, chatWith],
      });
    }
  };

  return (
    <div
      key={userId}
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
      <button
        className="text-green-500 text-2xl mr-4"
        onClick={() => createChat(name)}
      >
        <IoChatbubblesOutline />
      </button>
    </div>
  );
};

export default SingleUser;
