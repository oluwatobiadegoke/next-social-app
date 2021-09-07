import { useState, useEffect } from "react";
import useSWR from "swr";

import AllUsers from "./AllUsers";
import Scroll from "../../utils/Scroll";
import Spinner from "../../utils/Spinner";

const Users = ({ openUsers }) => {
  const [users, setUsers] = useState();

  const { data: data, error } = useSWR("/api/users");

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);

  return (
    <section
      className={`fixed top-16 ${
        openUsers ? "right-0 " : " -right-full "
      } z-30 h-full w-full lg:static lg:col-span-2 mt-10 bg-indigo-800 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60`}
      style={{ backdropFilter: "blur(20px)" }}
    >
      <Scroll>
        <div
          className="pl-2 py-2 sticky top-0 z-30 bg-indigo-800 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 flex justify-center"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <p className="text-black-100 font-bold">Users</p>
        </div>
        {error ? (
          <div className="mt-4 text-center px-4">
            <p className="text-red-500 font-bold">
              Sorry! Couldn't fetch users. Kindly check if you still have access
              to network or/and please try again.
            </p>
          </div>
        ) : (
          <>
            {!data || !users ? (
              <div className="mt-4 flex justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {data.length < 1 ? (
                  <div className="mt-4 text-center px-4">
                    <p className="text-red-500 font-bold">
                      There are currently no users available.
                    </p>
                  </div>
                ) : (
                  <AllUsers users={users} />
                )}
              </>
            )}
          </>
        )}
      </Scroll>
    </section>
  );
};

export default Users;
