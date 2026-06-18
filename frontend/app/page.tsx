"use client";

import QuickCards from "../components/QuickCards";
import ChatPanel from "../components/ChatPanel";

export default function Home() {

  return (

    <main className="min-h-screen bg-slate-950 text-white p-12">

      <h1 className="text-6xl font-bold">

        Welcome to Placemate AI 🚀

      </h1>

      <p className="text-slate-400 text-xl mt-4">

        Learn smarter.

        Prepare better.

        Get placed faster.

      </p>

      <QuickCards />

      <ChatPanel />

    </main>

  );

}

      

