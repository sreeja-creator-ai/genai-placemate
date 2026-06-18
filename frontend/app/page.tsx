"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import QuickCards from "../components/QuickCards";
import ChatPanel from "../components/ChatPanel";

export default function Home() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth"
  });

}, [messages, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: currentMessage
      })

    });

    const data = await response.json();

    const aiMessage = {

      role: "assistant",

      content: data.reply

    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);

  };


  return (

    <main className="flex bg-slate-950 text-white">

  <Sidebar />

  <div className="flex-1 p-12">

    <h1 className="text-6xl font-bold">

      Welcome to Placemate AI 🚀

    </h1>

    <p className="text-slate-400 text-xl mt-4">

      Learn smarter.

      Prepare better.

      Get placed faster.

    </p>

    {/* Chat Section */}

    {/* Quick Cards */}

    <QuickCards />
    <ChatPanel />

  </div>

</main>

);
}


      

