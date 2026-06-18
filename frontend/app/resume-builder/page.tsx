"use client";

import { useState } from "react";

export default function ResumeBuilderPage() {

  const [name,setName]=useState("");

  const [email,setEmail]=useState("");

  const [skills,setSkills]=useState("");

  const [education,setEducation]=useState("");

  const [projects,setProjects]=useState("");

  const [resume,setResume]=useState("");
  const [template, setTemplate] = useState("Modern");


  const generateResume = async () => {

    const response = await fetch(

      "https://genai-placemate.onrender.com/generate-resume",

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify({

          name,

          email,

          skills,

          education,

          projects,
          template

        })

      }

    );

    const data = await response.json();

    setResume(data.resume);

  };

  const downloadPDF = async () => {

    const response = await fetch(

      "https://genai-placemate.onrender.com/download-resume",

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify({

          resume

        })

      }

    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Placemate_Resume.pdf";

    a.click();

  };

  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">

        📄 AI Resume Builder

      </h1>

      <p className="text-slate-400 mt-3">

        Build ATS-friendly resumes instantly.

      </p>


      <div className="space-y-5 mt-10">

        <input

          placeholder="Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

          className="w-full p-4 bg-slate-900 rounded-2xl"

        />


        <input

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="w-full p-4 bg-slate-900 rounded-2xl"

        />
        <select

value={template}

onChange={(e)=>setTemplate(e.target.value)}

className="w-full p-4 rounded-2xl bg-slate-900 outline-none"

>

<option>Modern</option>

<option>Professional</option>

<option>Startup</option>

</select>


        <textarea

          placeholder="Skills"

          value={skills}

          onChange={(e)=>setSkills(e.target.value)}

          className="w-full h-28 p-4 bg-slate-900 rounded-2xl"

        />


        <textarea

          placeholder="Education"

          value={education}

          onChange={(e)=>setEducation(e.target.value)}

          className="w-full h-28 p-4 bg-slate-900 rounded-2xl"

        />


        <textarea

          placeholder="Projects"

          value={projects}

          onChange={(e)=>setProjects(e.target.value)}

          className="w-full h-40 p-4 bg-slate-900 rounded-2xl"

        />


        <button

          onClick={generateResume}

          className="bg-blue-600 px-8 py-4 rounded-2xl"

        >

          ✨ Generate Resume

        </button>

      </div>


      {resume && (
        <>
          <button
            onClick={downloadPDF}
            className="bg-green-600 px-6 py-3 rounded-2xl mt-6"
          >
            📄 Download PDF
          </button>

          <div className="bg-slate-900 p-8 rounded-3xl mt-10 whitespace-pre-wrap">
            {resume}
          </div>
        </>
      )}

    </main>

  );

}
