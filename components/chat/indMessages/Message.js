import { useSession } from "next-auth/client";
import moment from "moment";

const Message = ({ user, message }) => {
  const [session] = useSession();
  const loggedInUser = session.user.name;

  const type = user === loggedInUser ? "sender" : "receiver";

  return (
    <div
      className={`text-black-100 px-4 py-1 text-sm my-1 flex flex-col ${
        type === "sender"
          ? " self-end bg-green-800 rounded-l-md rounded-tr-md "
          : " self-start bg-indigo-900 rounded-r-md rounded-tr-md "
      }`}
    >
      <p>{message.message}</p>
      <p className="self-end" style={{ fontSize: "9px" }}>
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
      </p>
    </div>
  );
};

export default Message;
