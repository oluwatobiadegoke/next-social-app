import AllChats from "./AllChats";
import { useGlobalChatContext } from "../../../state/chatContext/chatContext";

const Chat = () => {
  const { chats, error } = useGlobalChatContext();
  return (
    <div className="h-full">
      <h1 className="font-bold my-3">Chats</h1>
      <div className="h-h w-full bg-indigo-800"></div>
      <div className="mt-4 text-sm">
        {error ? (
          <div className="mt-4 text-center px-4">
            <p className="text-red-500 font-bold">
              Sorry! Couldn't fetch chats.
            </p>
          </div>
        ) : (
          <>
            {!chats ? (
              <div className="mt-4 text-center px-4">
                <p className="text-green-500 font-bold">
                  You do not have any chat.
                </p>
              </div>
            ) : (
              chats?.docs.map((chat) => {
                return (
                  <AllChats
                    key={chat.id}
                    id={chat.id}
                    users={chat.data().user}
                  />
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
