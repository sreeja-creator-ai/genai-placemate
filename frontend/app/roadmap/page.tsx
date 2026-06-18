"use client";

import { useState } from "react";

export default function Roadmap() {

  const [goal, setGoal] = useState("");

  const [roadmap, setRoadmap] = useState("");

  const [loading, setLoading] = useState(false);


  const generateRoadmap = async () => {

    if (!goal.trim()) {

      alert("Please enter your career goal.");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(

        "https://genai-placemate.onrender.com/roadmap",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            goal

          })

        }

      );

      const data = await response.json();

      setRoadmap(data.roadmap);

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

    p-10

    ">

      {/* Heading */}

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

        🎯 Career Roadmap

      </h1>


      <p className="text-slate-400 mt-4 text-xl">

        Generate your personalized AI career roadmap.

      </p>


      {/* Input Section */}

      <div className="mt-10">

        <input

          value={goal}

          onChange={(e) =>

            setGoal(e.target.value)

          }

          placeholder="Example: Become an AI Engineer"

          className="

          w-full

          bg-white/5

          backdrop-blur-lg

          border

          border-white/10

          rounded-3xl

          p-5

          outline-none

          focus:border-blue-500

          text-lg

          "

        />


        <button

          onClick={generateRoadmap}

          className="

          mt-6

          bg-gradient-to-r

          from-blue-600

          to-purple-600

          px-8

          py-4

          rounded-3xl

          font-semibold

          hover:scale-105

          transition-all

          duration-300

          shadow-lg

          shadow-blue-500/30

          "

        >

          ✨ Generate Roadmap

        </button>

      </div>


      {/* Loading */}

      {loading && (

        <div className="

        flex

        items-center

        gap-4

        mt-10

        ">

          <div

            className="

            animate-spin

            h-8

            w-8

            border-4

            border-blue-500

            border-t-transparent

            rounded-full

            "

          ></div>

          <p>

            Placemate AI is generating your roadmap...

          </p>

        </div>

      )}


      {/* Output */}

      {roadmap && (

        <div

          className="

          bg-white/5

          backdrop-blur-lg

          border

          border-white/10

          rounded-3xl

          p-8

          mt-10

          shadow-xl

          whitespace-pre-wrap

          "

        >

          <h2 className="

          text-3xl

          font-bold

          mb-6

          ">

            🚀 Your Roadmap

          </h2>


          <div className="text-slate-200 leading-8">

            {roadmap}

          </div>

        </div>

      )}

    </main>

  );

}
