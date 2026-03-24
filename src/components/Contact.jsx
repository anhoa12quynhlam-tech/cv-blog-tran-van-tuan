import React from 'react';
import { Mail, Phone, Copy, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('reachsagarshah@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91 8980500565');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const socialLinks = [
    { icon: <Github size={24} />, href: '#' },
    { icon: <Twitter size={24} />, href: '#' },
    { icon: <Linkedin size={24} />, href: '#' },
    { icon: <Instagram size={24} />, href: '#' },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col gap-12 text-center items-center">
          <div className="space-y-4">
            <span className="badge">Get in touch</span>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              What’s next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect.
            </p>
          </div>

          <div className="space-y-6 flex flex-col items-center">
            <div className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
               <Mail className="w-8 h-8 md:w-12 md:h-12" />
               <span>reachsagarshah@gmail.com</span>
               <button onClick={copyEmail} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors relative">
                 <Copy className="w-6 h-6 md:w-8 md:h-8" />
                 {copiedEmail && (
                   <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-2 py-1 rounded">
                     Copied!
                   </span>
                 )}
               </button>
            </div>
            
            <div className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
               <Phone className="w-8 h-8 md:w-12 md:h-12" />
               <span>+91 8980500565</span>
               <button onClick={copyPhone} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors relative">
                 <Copy className="w-6 h-6 md:w-8 md:h-8" />
                 {copiedPhone && (
                   <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-2 py-1 rounded">
                     Copied!
                   </span>
                 )}
               </button>
            </div>
          </div>

          <div className="space-y-4 pt-12">
             <p className="text-zinc-600 dark:text-zinc-400 font-medium">
               You may also find me on these platforms!
             </p>
             <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
