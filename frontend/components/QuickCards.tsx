export default function QuickCards() {

  const cards = [

    {

      emoji: "📄",

      title: "Resume Review",

      desc: "ATS Score & Suggestions"

    },

    {

      emoji: "🎤",

      title: "Mock Interview",

      desc: "Practice Interviews"

    },

    {

      emoji: "📚",

      title: "Chat with PDF",

      desc: "Upload & Ask"

    },

    {

      emoji: "🎯",

      title: "Career Roadmap",

      desc: "Personalized Guidance"

    }

  ];


  return (

    <div className="grid grid-cols-2 gap-6 mt-10">

      {cards.map((card) => (

        <div

          key={card.title}

          className="bg-slate-900

          p-6

          rounded-2xl

          hover:scale-105

          transition

          cursor-pointer"

        >

          <div className="text-4xl">

            {card.emoji}

          </div>

          <h2 className="text-xl font-bold mt-4">

            {card.title}

          </h2>

          <p className="text-slate-400 mt-2">

            {card.desc}

          </p>

        </div>

      ))}

    </div>

  );

}