import Link from "next/link";

import { links } from "../../Mapovers/sideMenuLinks";

const PageLinks = ({ setOpenMenu }) => {
  return (
    <ul className="flex flex-col items-center mt-4">
      {links.map((link) => {
        const { id, name, path, icon } = link;
        return (
          <li key={id} className="w-1/2 flex items-center justify-start my-2 ">
            {icon}
            <Link href={path}>
              <a
                className="text-black-100 text-xl ml-2"
                onClick={() => setOpenMenu(false)}
              >
                {name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PageLinks;
