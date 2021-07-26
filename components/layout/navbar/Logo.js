import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex-1">
      <Link href="/user/home">
        <a className="font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-br from-light-400 to-black-200">
          X
        </a>
      </Link>
    </div>
  );
};

export default Logo;
