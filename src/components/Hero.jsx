import React from 'react';
import { MapPin, Instagram, Github, Twitter, Linkedin } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function Hero() {
  const socialLinks = [
    { icon: <Github size={20} />, href: '#', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
  ];

  return (
    <section className="section-padding py-24 md:py-32">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
              Hi, I'm Sagar 👋
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              I'm a full stack developer (React.js & Node.js) with a focus on creating (and occasionally
              designing) exceptional digital experiences that are fast, accessible, visually appealing,
              and responsive. Even though I've been creating web applications for over 7 years, I still
              feel like I'm just getting started.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <MapPin size={18} />
              <span>Ahmedabad, India</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">Available for new projects</span>
            </div>
          </div>

          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-64 h-72 md:w-80 md:h-96">
            {/* tilted background block */}
            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 -rotate-6 rounded-sm transition-transform duration-500 hover:rotate-0" />
            {/* photo frame */}
            <div className="absolute inset-0 border-8 border-white dark:border-zinc-950 overflow-hidden rounded-sm shadow-xl">
              <img
                src={heroImg}
                alt="Sagar Shah"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // fallback to a nice gradient avatar if image missing
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.classList.add('bg-gradient-to-br', 'from-zinc-300', 'to-zinc-400', 'dark:from-zinc-700', 'dark:to-zinc-600');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
