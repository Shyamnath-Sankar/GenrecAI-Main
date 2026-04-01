import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Shield, Zap, Search, PenTool, BarChart, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const FounderCard = ({ name, role, quote, image, socials }: {
  name: string,
  role: string,
  quote: string,
  image: string,
  socials: { linkedin?: string, github?: string, instagram?: string }
}) => (
  <div className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl h-[500px] w-full isolate">
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent z-10" />

    <img
      src={image}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
    />

    <div className="absolute bottom-0 left-0 p-8 w-full z-20">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-zinc-300 italic mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-mono text-sm leading-relaxed border-l-2 border-nothing-red pl-4">
          "{quote}"
        </p>
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{name}</h3>
            <p className="text-sm font-bold text-nothing-red tracking-widest uppercase">{role}</p>
          </div>

          <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ManifestoSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.8], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5, 0.8], [50, 0, -50]);

  return (
    <section ref={targetRef} className="py-32 relative min-h-[80vh] flex items-center justify-center">
      <motion.div
        style={{ opacity, y }}
        className="text-center max-w-4xl px-6"
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
          We don't just write code. <br />
          <span className="text-nothing-red">We engineer outcomes.</span>
        </h2>
        <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light">
          GENREC AI was founded on a simple observation: most modern software looks impressive but breaks under real conditions. We believe software should be fast, understandable, and resilient.
        </p>
      </motion.div>
    </section>
  );
};

export const About = () => {
  const founders = [
    {
      name: "Jai Samyukth B U",
      role: "Strategy & Product",
      quote: "We don't build features; we build leverage. Every line of code should multiply our client's capacity.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Shyamnath Sankar",
      role: "Operations & Scale",
      quote: "Operational excellence is not an accident. It's engineered.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Harish V",
      role: "Technical Lead",
      quote: "Complexity is the enemy. If you can't explain the architecture in 30 seconds, rewrite it.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-32">
      <SEO
        title="About Us"
        description="We are Genrec AI. A team of engineers and strategists building production-grade software that actually works."
      />

      {/* Staggered Hero */}
      <div className="pt-40 pb-20 px-6 container mx-auto">
        <div className="space-y-4 mb-20">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter"
          >
            THE
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-zinc-500"
          >
            ANTI
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-nothing-red"
          >
            AGENCY
          </motion.h1>
        </div>

        <div className="flex justify-end">
          <div className="text-xs font-mono text-zinc-400 text-right opacity-60">
                         // EST. 2024<br />
                         // BANGALORE, IN<br />
                         // STATUS: SCALING
          </div>
        </div>
      </div>

      <ManifestoSection />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Founders */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[1px] bg-nothing-red"></span>
            <h3 className="text-sm font-bold tracking-widest uppercase">The Architects</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <FounderCard {...founder} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mb-40">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm font-bold text-nothing-red tracking-widest mb-8">OUR PRINCIPLES</h3>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Built on First Principles. Not Trends.</h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                We reject the bloated, template-driven approach of traditional agencies. Every system we build starts from the ground up, optimized for your specific constraints.
              </p>
            </div>
            <div className="grid gap-8">
              {[
                { title: "Precision", desc: "Designed with intent. No unnecessary pixels.", icon: Target },
                { title: "Integrity", desc: "We don't sell what we can't defend technically.", icon: Shield },
                { title: "Durability", desc: "Systems designed to outlast the hype cycle.", icon: BarChart },
                { title: "Transparency", desc: "You see the system evolve. No black boxes.", icon: Search }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="shrink-0 w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center group-hover:bg-nothing-red/10 transition-colors">
                    <item.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-nothing-red transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-nothing-red transition-colors">{item.title}</h4>
                    <p className="text-zinc-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-20">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Ready to <span className="text-nothing-red">Build?</span>
            </h2>
            <a href="/contact" className="group flex items-center gap-4 text-xl font-bold hover:text-nothing-red transition-colors">
              Start a Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};