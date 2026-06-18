from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import os
from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import tempfile

# --------------------------
# Load Environment Variables
# --------------------------

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# --------------------------
# FastAPI App
# --------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://genai-placemate.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Request Models
# --------------------------

class ChatRequest(BaseModel):
    message: str


class InterviewRequest(BaseModel):

    answer: str = ""

    role: str

    difficulty: str

    question: str = ""


class PDFQuestion(BaseModel):

    text: str

    question: str


class RoadmapRequest(BaseModel):

    goal: str


# --------------------------
# Home
# --------------------------

@app.get("/")
def home():

    return {

        "message": "Placemate AI Running 🚀"

    }


# --------------------------
# Chatbot
# --------------------------

@app.post("/chat")
def chat(req: ChatRequest):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "system",

                "content":
                """
                You are Placemate AI.

                You help students with:

                - Placements
                - Resume building
                - AI careers
                - Interview preparation
                - Roadmaps
                """

            },

            {

                "role": "user",

                "content": req.message

            }

        ]

    )

    return {

        "reply":

        completion.choices[0].message.content

    }


# --------------------------
# Resume Analyzer
# --------------------------

from fastapi import UploadFile, File
from pypdf import PdfReader
import json


@app.post("/resume")
def analyze_resume(file: UploadFile = File(...)):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:

            text += extracted

    text = " ".join(text.split())

    prompt = f"""
You are an ATS Resume Analyzer.

IMPORTANT:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use ```json or ``` tags.
- Do NOT add explanations.

Return EXACTLY this format:

{{
    "ats_score":85,

    "strengths":[
        "Python",
        "Machine Learning"
    ],

    "missing_skills":[
        "Docker",
        "AWS"
    ],

    "suggestions":[
        "Add measurable achievements",
        "Improve project descriptions"
    ]
}}

Resume:

{text}
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    result = completion.choices[0].message.content

    result = result.replace("```json", "")

    result = result.replace("```", "")

    result = result.strip()

    try:

        parsed = json.loads(result)

    except:

        parsed = {

            "ats_score": 0,

            "strengths": [],

            "missing_skills": [],

            "suggestions": [

                "Could not parse AI response."

            ]

        }

    return {

        "analysis": parsed

    }


# --------------------------
# Generate Interview Question
# --------------------------

@app.post("/generate-question")
def generate_question(req: InterviewRequest):

    prompt = f"""
You are an expert interviewer.

Generate ONE interview question.

Role:

{req.role}

Difficulty:

{req.difficulty}

If Difficulty is Easy:

- Ask beginner conceptual questions.

If Difficulty is Medium:

- Ask project or implementation questions.

If Difficulty is Hard:

- Ask scenario-based or advanced questions.

IMPORTANT:

The question MUST be clearly different for each difficulty.

Return ONLY the question.
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    return {

        "question":

        completion.choices[0].message.content.strip()

    }


# --------------------------
# Mock Interview Evaluator
# --------------------------

@app.post("/mock-interview")
def mock_interview(req: InterviewRequest):

    prompt = f"""
You are an Interview Evaluator.

Evaluate the candidate.

Return ONLY valid JSON.

Format:

{{
"communication":8,
"technical":7,
"confidence":9,
"suggestions":[
"Improve eye contact",
"Use more technical terms",
"Add project examples"
]
}}

Role:

{req.role}

Difficulty:

{req.difficulty}

Question:

{req.question}

Candidate Answer:

{req.answer}
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    result = completion.choices[0].message.content

    result = result.replace("```json","")
    result = result.replace("```","")
    result = result.strip()

    return {

        "feedback": result

    }


# --------------------------
# PDF Chat
# --------------------------

@app.post("/ask-pdf")
def ask_pdf(req: PDFQuestion):

    prompt = f"""
You are an AI assistant.

Document:

{req.text}

Question:

{req.question}

Answer ONLY from the document.
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    return {

        "answer":

        completion.choices[0].message.content

    }


# --------------------------
# Career Roadmap
# --------------------------

@app.post("/roadmap")
def roadmap(req: RoadmapRequest):

    prompt = f"""
You are an AI Career Mentor.

Create a detailed 6-month roadmap.

Goal:

{req.goal}

Include:

1. Skills to Learn

2. Projects to Build

3. Courses

4. Placement Tips

Keep it month-wise.
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role": "user",

                "content": prompt

            }

        ]

    )

    return {

        "roadmap":

        completion.choices[0].message.content

    }
class ResumeRequest(BaseModel):

    name:str

    email:str

    skills:str

    education:str

    projects:str

    template:str
@app.post("/generate-resume")
def generate_resume(req: ResumeRequest):

    prompt = f"""

You are an expert Resume Writer.

Create an ATS-friendly resume.

Template:

{req.template}

Templates:

Modern:

Simple and clean.

Professional:

Corporate style with Summary,

Skills, Projects and Education.

Startup:

Modern style with highlights,

skills badges and featured projects.

Candidate Details:

Name:

{req.name}

Email:

{req.email}

Skills:

{req.skills}

Education:

{req.education}

Projects:

{req.projects}

Return a beautifully formatted resume.

"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {

                "role":"user",

                "content":prompt

            }

        ]

    )

    return {

        "resume":

        completion.choices[0].message.content

    }
class ResumePDFRequest(BaseModel):

    resume: str
@app.post("/download-resume")
def download_resume(req: ResumePDFRequest):

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    doc = SimpleDocTemplate(temp_file.name)

    styles = getSampleStyleSheet()

    story = []

    story.append(

        Paragraph(

            "<b>Placemate AI Resume</b>",

            styles["Title"]

        )

    )

    story.append(Spacer(1,20))

    for line in req.resume.split("\n"):

        if line.strip():

            story.append(

                Paragraph(

                    line,

                    styles["Normal"]

                )

            )

            story.append(Spacer(1,8))

    doc.build(story)

    return FileResponse(

        temp_file.name,

        media_type="application/pdf",

        filename="Placemate_Resume.pdf"

    )
@app.post("/upload-pdf")
def upload_pdf(file: UploadFile = File(...)):

    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:

            text += extracted

    text = " ".join(text.split())

    return {

        "text": text

    }
