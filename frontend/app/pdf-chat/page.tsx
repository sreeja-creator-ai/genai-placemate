"use client";

import { useState } from "react";

export default function PDFChatPage() {

  const [file, setFile] = useState<File | null>(null);

  const [pdfText, setPdfText] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);


  const uploadPDF = async () => {

    if (!file) {

      alert("Please select a PDF.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    const response = await fetch(

      "https://genai-placemate.onrender.com/upload-pdf",

      {

        method: "POST",

        body: formData

      }

    );

    const data = await response.json();

    setPdfText(data.text);

    setLoading(false);

    alert("PDF Uploaded Successfully ✅");

  };


  const askPDF = async () => {

    if (!pdfText || !question) {

      alert("Upload PDF and ask a question.");

      return;

    }

    setLoading(true);

    const response = await fetch(

      "https://genai-placemate.onrender.com/ask-pdf",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          text: pdfText,

          question

        })

      }

    );

    const data = await response.json();

    setAnswer(data.answer);

    setLoading(false);

  };


  return (

    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">

        📚 PDF Chat

      </h1>

      <p className="text-slate-400 mt-3">

        Upload any PDF and ask questions.

      </p>


      <div className="space-y-5 mt-10">

        <input

          type="file"

          accept=".pdf"

          onChange={(e)=>{

            if(e.target.files)

              setFile(e.target.files[0])

          }}

        />


        <button

          onClick={uploadPDF}

          className="bg-blue-600 px-6 py-3 rounded-2xl"

        >

          Upload PDF

        </button>


        <input

          type="text"

          placeholder="Ask something about the PDF..."

          value={question}

          onChange={(e)=>setQuestion(e.target.value)}

          className="w-full p-4 rounded-2xl bg-slate-900 outline-none"

        />


        <button

          onClick={askPDF}

          className="bg-purple-600 px-6 py-3 rounded-2xl"

        >

          Ask PDF

        </button>

      </div>


      {loading && (

        <div className="mt-8">

          🤖 Placemate AI is reading...

        </div>

      )}


      {answer && (

        <div className="bg-slate-900 p-8 rounded-3xl mt-10">

          <h2 className="text-2xl font-bold mb-4">

            Answer

          </h2>

          <div className="whitespace-pre-wrap">

            {answer}

          </div>

        </div>

      )}

    </main>

  );

}
