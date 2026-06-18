"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<

    {

      role: string;

      content: string;

    }[]

  >([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);


  // Auto Scroll

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

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    const currentMessage = message;

    setMessage("");

    try {

      setLoading(true);

      const response = await fetch(

        "https://genai-placemate.onrender.com/chat",

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

      setMessages(prev => [

        ...prev,

        aiMessage

      ]);

    }

    catch (error) {

      console.error(error);

      alert("Could not connect to backend.");

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <main className="

    min-h-screen

    bg-slate-950

    text-white

    flex

    flex-col

    ">

      {/* Header */}

      <div className="text-center py-8">

        <h1

          className="

          text-6xl

          font-extrabold

          bg-gradient-to-r

          from-blue-400

          to-purple-500

          bg-clip-text

          text-transparent

          "

        >

          💬 AI Chat

        </h1>

        <p className="text-slate-400 mt-4 text-xl">

          Ask Placemate AI anything about placements,

          AI, resumes or interviews.

        </p>

      </div>


      {/* Chat Area */}

      <div className="

      flex-1

      overflow-y-auto

      px-10

      pb-10

      ">

        {messages.length === 0 && (

          <div className="text-center mt-20">

            <h2 className="text-4xl font-bold">

              Hi Sreeja 👋

            </h2>

            <p className="text-slate-400 mt-4">

              Start a conversation with Placemate AI.

            </p>

          </div>

        )}


        {messages.map((msg, index) => (

          <div

            key={index}

            className={`

            flex

            gap-4

            my-8

            ${

              msg.role === "user"

              ?

              "justify-end"

              :

              "justify-start"

            }

            `}

          >

            {msg.role === "assistant" && (

              <div className="text-4xl">

                🤖

              </div>

            )}


            <div

              className={`

              max-w-2xl

              px-6

              py-5

              rounded-3xl

              whitespace-pre-wrap

              shadow-lg

              ${

                msg.role === "user"

                ?

                "bg-gradient-to-r from-blue-600 to-purple-600"

                :

                "bg-white/5 backdrop-blur-lg border border-white/10"

              }

              `}

            >

              {msg.content}

            </div>


            {msg.role === "user" && (

              <div className="text-4xl">

                👩

              </div>

            )}

          </div>

        ))}


        {/* Typing Indicator */}

        {loading && (

          <div className="flex gap-4 my-8">

            <div className="text-4xl">

              🤖

            </div>

            <div className="

            bg-white/5

            backdrop-blur-lg

            border

            border-white/10

            px-6

            py-5

            rounded-3xl

            animate-pulse

            ">

              Placemate AI is thinking...

            </div>

          </div>

        )}


        <div ref={chatEndRef}></div>

      </div>


      {/* Input Area */}

      <div className="

      border-t

      border-slate-800

      p-6

      ">

        <div className="flex gap-4">

          <input

            value={message}

            onChange={(e) =>

              setMessage(e.target.value)

            }

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}

            placeholder="Ask Placemate AI..."

            className="

            flex-1

            bg-white/5

            backdrop-blur-lg

            border

            border-white/10

            rounded-2xl

            p-5

            outline-none

            focus:border-blue-500

            "

          />


          <button

            onClick={sendMessage}

            className="

            bg-gradient-to-r

            from-blue-600

            to-purple-600

            px-8

            rounded-2xl

            font-semibold

            hover:scale-105

            transition-all

            duration-300

            shadow-lg

            shadow-blue-500/30

            "

          >

            Send 🚀

          </button>

        </div>

      </div>

    </main>

  );

}
