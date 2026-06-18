"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

  const items = [

    { name: "Dashboard", icon: "🏠", href: "/dashboard" },

    { name: "AI Chat", icon: "💬", href: "/chat" },

    { name: "Resume Analyzer", icon: "📄", href: "/resume" },

    { name: "Resume Builder", icon: "📝", href: "/resume-builder" },

    { name: "Mock Interview", icon: "🎤", href: "/mock-interview" },

    { name: "Career Roadmap", icon: "🎯", href: "/roadmap" },

    { name: "PDF Chat", icon: "📚", href: "/pdf-chat" },

  ];

  return (

    <aside
      className="

      w-72

      min-h-screen

      bg-slate-900/70

      backdrop-blur-xl

      border-r

      border-slate-800

      p-8

      "

    >

      {/* Logo */}

      <h1

        className="

        text-4xl

        font-extrabold

        mb-12

        bg-gradient-to-r

        from-blue-400

        to-purple-500

        bg-clip-text

        text-transparent

        "

      >

        🚀 Placemate AI

      </h1>


      {/* Menu */}

      <div className="space-y-4">

        {items.map((item) => (

          <Link

            key={item.href}

            href={item.href}

            className={`

            flex

            items-center

            gap-4

            px-5

            py-4

            rounded-2xl

            font-medium

            transition-all

            duration-300

            ${

              pathname === item.href

                ?

                "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 scale-105"

                :

                "hover:bg-slate-800 hover:scale-105"

            }

            `}

          >

            <span className="text-2xl">

              {item.icon}

            </span>

            <span>

              {item.name}

            </span>

          </Link>

        ))}

      </div>

    </aside>

  );

}