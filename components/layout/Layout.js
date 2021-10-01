import { Fragment, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";

import Sidemenu from "./sidemenu/Sidemenu";
import Topbar from "./navbar/Topbar";
import Users from "./users/Users";
import Chat from "./Chat";

const Layout = (props) => {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  return (
    <Fragment>
      <Topbar />
      <main className="main grid grid-cols-7 relative bg-indigo-800 overflow-y-hidden">
        <div
          className="floatingIcons left-2"
          style={{ backdropFilter: "blur(10px)" }}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <CgMenuGridO className="text-green-500 text-xl" />
        </div>
        <div
          className="floatingIcons right-2"
          style={{ backdropFilter: "blur(10px)" }}
          onClick={() => setOpenUsers(!openUsers)}
        >
          <FiUsers className="text-green-500 text-xl" />
        </div>
        <Sidemenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <section className="col-span-7 lg:col-span-3 my-5">
          {props.children}
        </section>
        <Users openUsers={openUsers} setOpenUsers={setOpenUsers} />
        {!router.pathname.includes("chat") && <Chat />}
      </main>
    </Fragment>
  );
};

export default Layout;
