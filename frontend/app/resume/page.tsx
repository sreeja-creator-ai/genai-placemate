"use client";

import { useState } from "react";

export default function ResumePage() {

  const [file, setFile] = useState<File | null>(null);

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "https://genai-placemate.onrender.com/resume",
      {
        method: "POST",

        body: formData
      }
    );

    const data = await response.json();

    setResult(data.analysis);

    setLoading(false);

  };

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-5xl font-bold">

        📄 Resume Analyzer

      </h1>

      <p className="text-slate-400 mt-3">

        Upload your resume and get ATS feedback instantly.

      </p>

      <div className="mt-10 space-y-6">

        <input

          type="file"

          accept=".pdf"

          onChange={(e) => {

            if (e.target.files)

              setFile(e.target.files[0]);

          }}

          className="block"

        />

        <button

          onClick={analyzeResume}

          className="bg-blue-600 px-6 py-3 rounded-2xl"

        >

          Analyze Resume

        </button>

        {loading && (

<div className="flex items-center gap-4 mt-6">

<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>

<p>

Placemate AI is analyzing...

</p>

</div>

)}

        {result && (

<div className="grid gap-6 mt-10">

  <div className="bg-slate-900 p-6 rounded-3xl">

    <h2 className="text-slate-400">

      ATS Score

    </h2>

    <p className="text-6xl font-bold mt-3">

      {result.ats_score}/100

    </p>

  </div>


  <div className="bg-slate-900 p-6 rounded-3xl">

    <h2 className="text-xl font-semibold">

      ✅ Strengths

    </h2>

    <ul className="mt-4 space-y-2">

      {result?.strengths?.map(

        (item: string, index: number) => (

          <li key={index}>

            • {item}

          </li>

        )

      )}

    </ul>

  </div>


  <div className="bg-slate-900 p-6 rounded-3xl">

    <h2 className="text-xl font-semibold">

      ❌ Missing Skills

    </h2>

    <ul className="mt-4 space-y-2">

      {result?.missing_skills?.map(

        (item: string, index: number) => (

          <li key={index}>

            • {item}

          </li>

        )

      )}

    </ul>

  </div>


  <div className="bg-slate-900 p-6 rounded-3xl">

    <h2 className="text-xl font-semibold">

      💡 Suggestions

    </h2>

    <ul className="mt-4 space-y-2">

      {result?.suggestions?.map(

        (item: string, index: number) => (

          <li key={index}>

            • {item}

          </li>

        )

      )}

    </ul>

  </div>

</div>

)}

      </div>

    </main>

  );

}
