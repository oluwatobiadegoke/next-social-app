import { Fragment } from "react";
import { useSession } from "next-auth/client";

import Sidemenu from "./Sidemenu";
import Topbar from "./navbar/Topbar";

const Layout = (props) => {
  const [session] = useSession();
  return (
    <Fragment>
      {session && <Topbar />}
      <main>
        {session && <Sidemenu />}
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
