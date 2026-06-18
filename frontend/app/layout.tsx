import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="bg-slate-950 text-white">

        <div className="flex">

          <Sidebar />

          <main className="flex-1">

            {children}

          </main>
          <footer
  className="

  text-center

  py-8

  border-t

  border-slate-800

  bg-slate-950

  "
>

  <h2
    className="

    text-2xl

    font-bold

    bg-gradient-to-r

    from-blue-400

    to-purple-500

    bg-clip-text

    text-transparent

    "
  >

    🚀 Placemate AI

  </h2>

  <p className="text-slate-400 mt-3">

    Built by Sreeja Gubbala

  </p>

  <p className="text-slate-500 mt-2">

    Powered by Next.js • FastAPI • Groq

  </p>

</footer>


        </div>

      </body>

    </html>

  );

}