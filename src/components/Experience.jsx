import React from 'react';

const EXPERIENCES = [
  {
    company: 'Upwork',
    role: 'Independent Freelancer',
    date: 'Nov 2021 - Present',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Ut pretium arcu et massa semper, id fringilla leo semper.',
      'Sed quis justo ac magna accumsan viverra.',
      'Convallis luctus pretium.',
    ],
  },
  {
    company: 'Dot Squad',
    role: 'Full Stack Developer',
    date: 'Jul 2017 - Oct 2021',
    details: [
      'Sed quis justo ac magna accumsan viverra.',
      'Ut pretium arcu et massa semper, id fringilla leo semper.',
      'Sed quis justo ac magna accumsan viverra.',
      'Convallis luctus pretium.',
    ],
  },
  {
    company: 'SNDK',
    role: 'Full Stack Developer',
    date: 'Dec 2015 - May 2017',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-custom">
        <div className="flex flex-col gap-12">
          <div className="text-center space-y-4">
            <span className="badge">Experience</span>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Here is a quick summary of my most recent experiences:
            </p>
          </div>

          <div className="flex flex-col gap-12 max-w-4xl mx-auto w-full">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12">
                   <div className="flex-shrink-0">
                      <h3 className="text-2xl font-bold text-emerald-500">{exp.company}</h3>
                   </div>
                   
                   <div className="flex-1 space-y-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                          {exp.role}
                        </h4>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {exp.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                   </div>

                   <div className="flex-shrink-0">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                        {exp.date}
                      </span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
