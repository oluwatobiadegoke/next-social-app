import { Fragment } from "react";
import { useSession } from "next-auth/client";

import Sidemenu from "./sidemenu/Sidemenu";
import Topbar from "./navbar/Topbar";
import Users from "./users/Users";

const Layout = (props) => {
  const [session] = useSession();
  return (
    <Fragment>
      {session && <Topbar />}
      <main className="main grid grid-cols-7 relative bg-indigo-800">
        {session && <Sidemenu />}
        <section className={`${session ? "col-span-3 my-5" : "col-span-7"}`}>
          {props.children}
        </section>
        {session && <Users />}
      </main>
    </Fragment>
  );
};

export default Layout;
