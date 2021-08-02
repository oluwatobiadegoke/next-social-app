import Bio from "./Bio";
import PageLinks from "./PageLinks";
import Signout from "./Signout";

const Sidemenu = () => {
  return (
    <section className="col-span-2 bg-indigo-800 flex flex-col px-5">
      <Bio />
      <div className="h-h w-full bg-indigo-700 self-center"></div>
      <PageLinks />
      <Signout />
    </section>
  );
};

export default Sidemenu;
