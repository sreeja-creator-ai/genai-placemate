"use client";

import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";

export default function MockInterviewPage() {

  const questions = [

    "Tell me about yourself.",

    "Explain one project you worked on.",

    "What are your strengths?",

    "Why do you want this role?",

    "Where do you see yourself in 5 years?"

  ];

  const [role, setRole] = useState("Data Scientist");

  const [difficulty, setDifficulty] = useState("Easy");

  const [questionNo, setQuestionNo] = useState(1);

  const [question, setQuestion] = useState(questions[0]);

  const [answer, setAnswer] = useState("");

  const [feedback,setFeedback]=useState<any>(null);

  const [loading, setLoading] = useState(false);
  


  // Generate AI Question

  const generateQuestion = async () => {

    try {

      setLoading(true);

      const response = await fetch(

        "http://127.0.0.1:8000/generate-question",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            role,

            difficulty

          })

        }

      );

      const data = await response.json();

      setQuestion(data.question);

      setAnswer("");

      setFeedback("");

    }

    catch (error) {

      console.error(error);

      alert("Could not generate question.");

    }

    finally {

      setLoading(false);

    }

  };


  // Evaluate Answer

  const submitAnswer = async () => {

    if (!answer.trim()) {

      alert("Please enter an answer.");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(

        "http://127.0.0.1:8000/mock-interview",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            answer,

            role,

            difficulty,

            question

          })

        }

      );

      const data = await response.json();

      const parsed = JSON.parse(data.feedback);

setFeedback(parsed);
    }

    catch (error) {

      console.error(error);

      alert("Could not connect to backend.");

    }

    finally {

      setLoading(false);

    }

  };


  // Next Question

  const nextQuestion = () => {

    if (questionNo >= questions.length) {

      alert("Interview Completed 🎉");

      return;

    }

    const next = questionNo;

    setQuestionNo(next + 1);

    setQuestion(questions[next]);

    setAnswer("");

    setFeedback("");

  };


  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">

        🎤 Mock Interview

      </h1>

      <p className="text-slate-400 mt-3">

        Practice interviews with Placemate AI.

      </p>


      {/* Dropdowns */}

      <div className="flex gap-6 mt-8">

        <select

          value={role}

          onChange={(e) => setRole(e.target.value)}

          className="bg-slate-900 p-4 rounded-2xl"

        >

          <option>Data Scientist</option>

          <option>AI Engineer</option>

          <option>Software Engineer</option>

          <option>Data Analyst</option>

        </select>


        <select

          value={difficulty}

          onChange={(e) => setDifficulty(e.target.value)}

          className="bg-slate-900 p-4 rounded-2xl"

        >

          <option>Easy</option>

          <option>Medium</option>

          <option>Hard</option>

        </select>

      </div>


      {/* Generate Question */}

      <button

        onClick={generateQuestion}

        className="bg-purple-600 px-6 py-3 rounded-2xl mt-6 hover:bg-purple-700"

      >

        ✨ Generate AI Question

      </button>


      {/* Question Card */}

      <div className="bg-slate-900 p-8 rounded-3xl mt-10">

        <h2 className="text-2xl font-semibold">

          Question {questionNo}/5

        </h2>

        <p className="mt-4 text-lg">

          {question}

        </p>

      </div>


      {/* Answer Box */}

      <textarea

        value={answer}

        onChange={(e) => setAnswer(e.target.value)}

        className="w-full h-40 bg-slate-900 mt-8 p-5 rounded-3xl outline-none"

        placeholder="Type your answer here..."

      />


      {/* Buttons */}

      <div className="flex gap-4 mt-6">

        <button

          onClick={submitAnswer}

          className="bg-blue-600 px-6 py-3 rounded-2xl hover:bg-blue-700"

        >

          Evaluate Answer

        </button>


        <button

          onClick={nextQuestion}

          className="bg-slate-700 px-6 py-3 rounded-2xl hover:bg-slate-600"

        >

          Next Question

        </button>

      </div>


      {/* Loading */}

      {loading && (

<div className="flex items-center gap-4 mt-8">

<div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>

<p>

Evaluating your answer...

</p>

</div>

)}


      {/* Feedback */}

      {feedback && (

<div className="mt-10">

<h2 className="text-3xl font-bold mb-6">

📊 Interview Scores

</h2>

<div className="grid grid-cols-3 gap-6">

<div className="bg-slate-900 p-6 rounded-3xl">

<div className="text-slate-400">

🎙 Communication

</div>

<div className="text-5xl font-bold mt-3">

{feedback.communication}/10

</div>

</div>


<div className="bg-slate-900 p-6 rounded-3xl">

<div className="text-slate-400">

💻 Technical

</div>

<div className="text-5xl font-bold mt-3">

{feedback.technical}/10

</div>

</div>


<div className="bg-slate-900 p-6 rounded-3xl">

<div className="text-slate-400">

🚀 Confidence

</div>

<div className="text-5xl font-bold mt-3">

{feedback.confidence}/10

</div>

</div>

</div>


<div className="bg-slate-900 p-8 rounded-3xl mt-8">

<h3 className="text-2xl font-semibold">

Suggestions

</h3>

<ul className="mt-4 space-y-3">

{feedback.suggestions.map(

(item:string,index:number)=>(

<li key={index}>

✅ {item}

</li>

)

)}

</ul>

</div>

</div>

)}

      <VoiceRecorder

        onTranscript={(text)=>{

          setAnswer(text);

        }}

      />

    </main>

  );

}