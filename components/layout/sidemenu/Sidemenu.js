import Bio from "./Bio";
import PageLinks from "./PageLinks";
import Signout from "./Signout";

const Sidemenu = ({ openMenu }) => {
  return (
    <section
      className={`fixed top-16 ${
        openMenu ? " left-0 " : " -left-full "
      } z-30 h-full w-full lg:static lg:col-span-2 bg-indigo-800 flex flex-col px-2 md:px-5 transition bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60`}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Bio />
      <div className="h-h w-full bg-indigo-700 self-center"></div>
      <PageLinks />
      <Signout />
    </section>
  );
};

export default Sidemenu;
