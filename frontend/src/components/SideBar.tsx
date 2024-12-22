import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Logo from "@/assets/Logo";
import { IoIosExit, IoIosMenu } from "react-icons/io";
import useWindowSize from "@/hooks/useWindowSize";

type Route = {
  route: string;
  section: string;
};

const routes: Route[] = [
  { route: "/dashboard", section: "Home" },
  { route: "/sales", section: "Vendas" },
  { route: "/send-transactions", section: "Novas transações" },
];

export default function Sidebar() {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState((width && width <= 1024) ? false : true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("auth_token");
    router.push("/login");
  };

  return (
    <>
      <IoIosMenu
        size={30}
        className="lg:hidden fixed top-4 left-4 z-50 text-lime-400 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:static top-0 left-0 pb-12 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 lg:w-96 lg:flex"
          >
            <h1 className="pt-8 pb-6 text-lg w-[90%] m-auto font-bold border-b border-zinc-800">
              <Logo className="m-auto" />
            </h1>
            <nav className="flex-1 mt-4 p-3">
              <ul className="flex flex-col gap-2">
                {routes.map(({ route, section }) => (
                  <li key={route}>
                    <Link href={route}>
                      <div
                        className={`block px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-600 transition ${
                          pathname === route
                            ? "bg-zinc-700 text-lime-400 pl-9"
                            : ""
                        }`}
                      >
                        {section}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={handleLogout}
              className="flex m-auto items-center gap-2"
            >
              Sair
              <IoIosExit
                size={30}
                className="text-lime-400 transition hover:text-red-400"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden cursor-pointer"
        ></div>
      )}
    </>
  );
}
