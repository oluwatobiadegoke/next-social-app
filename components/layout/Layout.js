import { Fragment } from "react";
import { useSession } from "next-auth/client";

import Sidemenu from "./sidemenu/Sidemenu";
import Topbar from "./navbar/Topbar";
import Followers from "./followers/Followers";

const Layout = (props) => {
  const [session] = useSession();
  return (
    <Fragment>
      {session && <Topbar />}
      <main className="main grid grid-cols-7 relative">
        {session && <Sidemenu />}
        <section className="col-span-3 my-5">{props.children}</section>
        {session && <Followers />}
      </main>
    </Fragment>
  );
};

export default Layout;
