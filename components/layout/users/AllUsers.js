import SingleUser from "./SingleUser";

const AllUsers = ({ users }) => {
  return (
    <div className="w-full shadow-xl pr-2">
      {users.map((user) => {
        const { userId, name, email } = user;
        return (
          <SingleUser key={userId} userId={userId} name={name} email={email} />
        );
      })}
    </div>
  );
};

export default AllUsers;
