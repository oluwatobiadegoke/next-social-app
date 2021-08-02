import Allfollowers from "./Allfollowers";
import Scroll from "../../../components/utils/Scroll";

const Followers = () => {
  return (
    <section className="col-span-2 mt-10">
      <Scroll>
        <div
          className="pl-2 py-2 sticky top-0 z-10 bg-indigo-800 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <p className="text-black-100 font-bold">Followers</p>
        </div>
        <Allfollowers />
      </Scroll>
    </section>
  );
};

export default Followers;
