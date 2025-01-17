"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Signature from "@/components/Signature";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookie.get("auth_token");

    if (!token) {
      router.push("/login");
    }
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Loading...</h1>
      </main>
      <Signature /> 
    </div>
  );
}
