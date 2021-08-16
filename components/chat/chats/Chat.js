import { chats } from "../../Mapovers/chats";
import AllChats from "./AllChats";

const Chat = () => {
  return (
    <div>
      <h1>Chats</h1>
      {chats.find((chat) => {
        const { id, name } = chat;
        return <AllChats key={id} name={name} />;
      })}
    </div>
  );
};

export default Chat;
