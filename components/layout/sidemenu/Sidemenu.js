import Bio from "./Bio";
import PageLinks from "./PageLinks";

const Sidemenu = () => {
  return (
    <section className="col-span-2 bg-white">
      <Bio />
      <div className="h-h w-full bg-black-100 mx-5"></div>
      <PageLinks />
    </section>
  );
};

export default Sidemenu;
