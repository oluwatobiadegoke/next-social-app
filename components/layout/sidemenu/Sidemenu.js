import Bio from "./Bio";
import PageLinks from "./PageLinks";

const Sidemenu = () => {
  return (
    <section className=" col-span-2 bg-white flex flex-col px-5">
      <Bio />
      <div className="h-h w-full bg-black-100 self-center"></div>
      <PageLinks />
    </section>
  );
};

export default Sidemenu;
