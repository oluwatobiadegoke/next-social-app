import Logo from "./Logo";
import Info from "./Info";

const Topbar = () => {
  return (
    <header className="bg-indigo-800 w-full h-16 flex justify-between items-center px-4 shadow sticky top-0 left-0 z-10">
      <Logo />
      <Info />
    </header>
  );
};

export default Topbar;
