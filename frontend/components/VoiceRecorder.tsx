"use client";

import { useState, useRef } from "react";

export default function VoiceRecorder({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {

  const [recording, setRecording] = useState(false);

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition is not supported in this browser.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {

      let transcript = "";

      for (

        let i = event.resultIndex;

        i < event.results.length;

        i++

      ) {

        transcript += event.results[i][0].transcript;

      }

      onTranscript(transcript);

    };

    recognition.onerror = (event: any) => {

      console.log(event.error);

      setRecording(false);

    };

    recognition.onend = () => {

      setRecording(false);

    };

    recognition.start();

    recognitionRef.current = recognition;

    setRecording(true);

  };


  const stopRecording = () => {

    recognitionRef.current?.stop();

    setRecording(false);

  };


  return (

    <div className="mt-6">

      {!recording ? (

        <button

          onClick={startRecording}

          className="bg-green-600 px-6 py-3 rounded-2xl hover:bg-green-700"

        >

          🎤 Start Recording

        </button>

      ) : (

        <button

          onClick={stopRecording}

          className="bg-red-600 px-6 py-3 rounded-2xl hover:bg-red-700"

        >

          ⏹ Stop Recording

        </button>

      )}

    </div>

  );

}