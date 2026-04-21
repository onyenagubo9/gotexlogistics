"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Clock, Globe, Headphones, ArrowUpRight } from "lucide-react";

/* ---------------- ANIMATION VARIANTS ---------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function WhyChooseUs() {
  const reasons = [
    { 
      icon: ShieldCheck, 
      title: "Secure Handling", 
      desc: "Advanced protocols and insurance to keep every package safe." 
    },
    { 
      icon: Clock, 
      title: "On-Time Delivery", 
      desc: "Industry-leading punctuality powered by smart route optimization." 
    },
    { 
      icon: Globe, 
      title: "Worldwide Reach", 
      desc: "Seamless logistics across 200+ countries and territories." 
    },
    { 
      icon: Headphones, 
      title: "24/7 Support", 
      desc: "Real human experts available around the clock to help." 
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,#facc1515,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,#facc1510,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why leading brands <br />
              <span className="text-yellow-400 font-serif italic">trust</span> our network
            </h2>
            <div className="h-1 w-20 bg-yellow-400 rounded-full" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xs md:text-right"
          >
            Setting the gold standard in global logistics with a focus on precision and protection.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300"
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-[radial-gradient(circle_at_center,#facc1508,transparent_70%)] pointer-events-none" />

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-yellow-400 text-slate-950 shadow-[0_0_15px_rgba(250,204,21,0.4)] group-hover:rotate-360 transition-transform duration-700">
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="absolute top-0 right-0 w-5 h-5 text-slate-700 group-hover:text-yellow-400 transition-colors" />
              </div>

              {/* Text Content */}
              <h3 className="font-bold text-xl text-white mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {desc}
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-slate-800 to-transparent group-hover:via-yellow-400 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}