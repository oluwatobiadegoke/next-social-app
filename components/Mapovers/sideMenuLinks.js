import { FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export const links = [
  {
    id: 1,
    name: "Home",
    path: "/user/home",
    icon: <FiHome className="text-black-100 text-xl" />,
  },
  {
    id: 2,
    name: "Profile",
    path: "/user/profile",
    icon: <CgProfile className="text-black-100 text-xl" />,
  },
];
