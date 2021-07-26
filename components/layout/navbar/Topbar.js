import Search from "./Search";
import Logo from "./Logo";
import Info from "./Info";

const Topbar = () => {
  return (
    <header className="bg-indigo-800 w-full h-16 flex justify-between items-center px-4 shadow">
      <Logo />
      <Search />
      <Info />
    </header>
  );
};

export default Topbar;
