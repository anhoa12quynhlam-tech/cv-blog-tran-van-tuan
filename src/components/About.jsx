import React from "react";
import Pic from "../assets/Pic.png";

export default function About() {
  const highlights = [
    "Full time freelancer",
    "Ahmedabad, India",
    "B.Tech in Computer Engineering",
    "7+ years experience",
  ];

  return (
    <section
      id="about"
      className="section-padding bg-zinc-50 dark:bg-zinc-950/50"
    >
      <div className="container-custom">
        <div className="flex flex-col gap-12">
          <div className="text-center">
            <span className="badge">About me</span>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="relative w-64 h-80 md:w-80 md:h-[420px]">
                <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rotate-6 rounded-sm transition-transform duration-500 hover:rotate-0" />
                <div className="absolute inset-0 border-8 border-white dark:border-zinc-950 overflow-hidden shadow-xl rounded-sm">
                  <img
                    src={Pic}
                    alt="Sagar Shah"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add(
                        "bg-gradient-to-br",
                        "from-zinc-300",
                        "to-zinc-400",
                        "dark:from-zinc-700",
                        "dark:to-zinc-600",
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Text — JSX sau → hiển thị bên dưới khi mobile */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                Curious about me? Here you have it:
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                <p>
                  I'm a passionate, self-proclaimed designer who specializes in
                  full stack development (React.js &amp; Node.js). I am very
                  enthusiastic about bringing the technical and visual aspects
                  of digital products to life. User experience, pixel perfect
                  design, and writing clear, readable, highly performant code
                  matters to me.
                </p>
                <p>
                  I began my journey as a web developer in 2015, and since then,
                  I've continued to grow and evolve as a developer, taking on
                  new challenges and learning the latest technologies along the
                  way. Now in my early thirties, 7 years after starting my web
                  development journey, I'm building cutting-edge web
                  applications using modern technologies such as Next.js,
                  TypeScript, Tailwindcss, Supabase and much more.
                </p>
                <p>
                  I am very much a progressive thinker and enjoy working on
                  products end to end, from ideation all the way to development.
                </p>
                <p>
                  When I'm not in full developer mode, you can find me hovering
                  over twitter or enjoying some free time. You can follow me on
                  Twitter where I share tech-related bites and build in public,
                  or you can follow me on GitHub.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
