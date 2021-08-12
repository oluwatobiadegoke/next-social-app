import AllUsers from "./AllUsers";
import Scroll from "../../utils/Scroll";

const Users = () => {
  return (
    <section className="col-span-2 mt-10">
      <Scroll>
        <div
          className="pl-2 py-2 sticky top-0 z-10 bg-indigo-800 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <p className="text-black-100 font-bold">Users</p>
        </div>
        <AllUsers />
      </Scroll>
    </section>
  );
};

export default Users;
