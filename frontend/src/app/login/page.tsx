"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { validateFields } from "@/utils/validateFields";
import Logo from "@/assets/Logo";
import Button from "@/components/Button";
import Signature from "@/components/Signature";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationErrors = validateFields(email, password);

    if (validationErrors.length > 0) {
      setError(validationErrors);
      setEmail("");
      setPassword("");
      return;
    }

    setError([]);
    try {
      // -----Login Successful Response Simulation-----

      // Token saving simulation
      const data = { token: "dummy_token" };
      Cookie.set("auth_token", data.token);

      // Redirection to the dashboard page
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError(["Erro interno, tente novamente mais tarde :("]);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-zinc-900 lg:bg-[url('/img/dark-green.webp')] bg-no-repeat bg-cover bg-top p-3 md:p-0">
      <div className="w-full max-w-sm bg-zinc-900 rounded-lg border-zinc-800 border">
        <div className="p-6">
          <Logo className="m-auto mb-4" />
          <h2 className="mt-[6px] text-2xl font-semibold leading-none tracking-tight text-center">
            Faça seu login
          </h2>
          <p className="mt-[6px] text-sm text-muted-foreground text-center text-zinc-500">
            Informe seus dados para continuar
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-3">
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white leading-none"
            >
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white leading-none"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {error.length > 0 && (
            <ul className="text-red-500 text-sm mb-4 transition-all">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}

          <Button content="Entrar" action={handleSubmit} />
        </form>
        <div className="relative my-4 px-6">
          <div className="h-[1px] w-auto bg-zinc-800"></div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-xs text-zinc-400">
            Ou
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground pb-6">
          Não possui uma conta na Hubla?{" "}
          <a className="text-lime-600" href="/signup">
            Crie sua conta
          </a>
        </p>
      </div>
      <Signature />
    </main>
  );
}
