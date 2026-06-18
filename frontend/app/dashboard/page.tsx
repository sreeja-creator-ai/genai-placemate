
export default function Dashboard() {

  const cards = [

    {

      icon: "📄",

      title: "Resume Analyzer",

      desc: "Get ATS score and improve your resume instantly."

    },

    {

      icon: "📝",

      title: "Resume Builder",

      desc: "Create professional resumes with AI templates."

    },

    {

      icon: "🎤",

      title: "Mock Interview",

      desc: "Practice interviews and receive AI feedback."

    },

    {

      icon: "🎯",

      title: "Career Roadmap",

      desc: "Generate a step-by-step roadmap for your dream role."

    },

    {

      icon: "📚",

      title: "PDF Chat",

      desc: "Upload PDFs and ask questions intelligently."

    },

    {

      icon: "💬",

      title: "AI Chat",

      desc: "Ask anything about placements, AI or careers."

    }

  ];

  return (

    <main className="min-h-screen p-10">

      {/* Hero Section */}

      <div className="text-center mt-8">

        <h1

          className="

          text-7xl

          font-extrabold

          bg-gradient-to-r

          from-blue-400

          to-purple-500

          bg-clip-text

          text-transparent

          "

        >

          Welcome to Placemate AI 🚀

        </h1>

        <p className="text-slate-400 text-2xl mt-6">

          Learn smarter.

          Prepare better.

          Get placed faster.

        </p>

      </div>


      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mt-16">

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

          <h2 className="text-slate-400">

            Features

          </h2>

          <p className="text-5xl font-bold mt-4">

            7+

          </p>

        </div>


        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

          <h2 className="text-slate-400">

            AI Powered

          </h2>

          <p className="text-5xl font-bold mt-4">

            Groq

          </p>

        </div>


        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">

          <h2 className="text-slate-400">

            Tech Stack

          </h2>

          <p className="text-3xl font-bold mt-4">

            Next + FastAPI

          </p>

        </div>

      </div>


      {/* Features Grid */}

      <div className="grid grid-cols-3 gap-8 mt-16">

        {cards.map((card, index) => (

          <div

            key={index}

            className="

            bg-white/5

            backdrop-blur-lg

            border

            border-white/10

            p-8

            rounded-3xl

            hover:scale-105

            transition-all

            duration-300

            hover:shadow-xl

            hover:shadow-blue-500/20

            "

          >

            <div className="text-5xl">

              {card.icon}

            </div>

            <h2 className="text-2xl font-bold mt-6">

              {card.title}

            </h2>

            <p className="text-slate-400 mt-4">

              {card.desc}

            </p>

          </div>

        ))}

      </div>

    </main>

  );

}