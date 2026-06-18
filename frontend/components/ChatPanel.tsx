"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPanel() {

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

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          message: currentMessage

        })

      }
    );

    const data = await response.json();

    const aiMessage = {

      role: "assistant",

      content: data.reply

    };

    setMessages(prev => [...prev, aiMessage]);

    setLoading(false);

  };


  return (

    <div className="mt-10">

      {/* Messages */}

      <div className="space-y-5 min-h-[400px]">

        {messages.map((msg, index) => (

          <div

            key={index}

            className={`flex

            ${msg.role === "user"

                ? "justify-end"

                : "justify-start"

              }`}

          >

            <div

              className={`

              max-w-2xl

              px-6 py-4

              rounded-3xl

              shadow-lg

              ${msg.role === "user"

                  ? "bg-violet-600"

                  : "bg-slate-800"

                }

              `}

            >

              {msg.content}

            </div>

          </div>

        ))}

        {loading && (

          <div className="bg-slate-800 px-6 py-4 rounded-3xl animate-pulse inline-block">

            🤖 Placemate AI is thinking...

          </div>

        )}

        <div ref={chatEndRef}></div>

      </div>


      {/* Input */}

      <div className="mt-8 flex gap-4">

        <input

          className="

          flex-1

          p-5

          rounded-2xl

          bg-slate-900

          border border-slate-700

          outline-none

          "

          placeholder="Ask Placemate AI anything..."

          value={message}

          onChange={(e) => setMessage(e.target.value)}

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendMessage();

            }

          }}

        />

        <button

          onClick={sendMessage}

          className="

          px-8

          rounded-2xl

          bg-violet-600

          hover:scale-105

          transition

          "

        >

          ➤

        </button>

      </div>

    </div>

  );

}