import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Logo from "@/assets/Logo";
import { IoIosExit } from "react-icons/io";

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
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("auth_token");

    router.push("/login");
  };

  return (
    <div className="h-screen pb-10 w-64 lg:w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col">
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
                    pathname === route ? "bg-zinc-700 text-lime-400 pl-9" : ""
                  }`}
                >
                  {section}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={handleLogout} className="flex m-auto items-center gap-2">
        Sair
        <IoIosExit
          size={30}
          className="text-lime-400 transition hover:text-red-400"
        />
      </button>
    </div>
  );
}
