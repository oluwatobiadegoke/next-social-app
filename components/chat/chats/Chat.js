import { chats } from "../../Mapovers/chats";
import AllChats from "./AllChats";

const Chat = () => {
  return (
    <div className="h-full">
      <h1 className="font-bold my-3">Chats</h1>
      <div className="h-h w-full bg-indigo-800"></div>
      <div className="mt-4 text-sm">
        {chats.map((chat) => {
          const { id, name } = chat;
          return <AllChats key={id} name={name} />;
        })}
      </div>
    </div>
  );
};

export default Chat;
