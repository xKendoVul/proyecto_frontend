import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
} from "react-icons/io5";


const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Generos",
    path: "/dashboard/genres",
  },
  {
    icon: <IoListOutline />,
    title: "Libros",
    path: "/dashboard/books",
  },
];

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-20 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen bg-gradient-to-b from-green-100 via-white to-green-50 shadow-2xl border-r border-green-200 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-6 flex items-center gap-3 bg-green-50 rounded-b-2xl shadow-sm">
          <Link href="#" title="home" className="flex items-center gap-2">
            <Image
              src="https://images.vexels.com/media/users/3/147726/isolated/svg/3c35c23c922833a71a94e7d5faf28b88.svg"
              className="w-12 h-12"
              alt="tailus logo"
              width={48}
              height={48}
            />
            <span className="text-2xl font-bold text-green-700 hidden md:inline">
              Biblioteca
            </span>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <div className="relative w-28 h-28 mx-auto">
            <Image
              src="https://wallpapers.com/images/hd/courage-the-cowardly-dog-t3iwvstt2w6a8wxm.jpg"
              width={112}
              height={112}
              alt="Avatar"
              className="rounded-full object-cover border-4 border-green-300 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white rounded-full w-5 h-5 block"></span>
          </div>
          <h5 className="mt-4 text-2xl font-semibold text-green-700">
            Bibliotecario
          </h5>
          <span className="text-green-500 text-sm">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-10">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-green-200 bg-green-50 rounded-t-2xl shadow-sm">
      <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-green-700 hover:bg-green-100 transition font-semibold group"
      >
        <CiLogout className="text-2xl" />
        <span className="group-hover:text-green-900">Cerrar sesión</span>
      </button>
    </div>
    </aside>
  );
};
