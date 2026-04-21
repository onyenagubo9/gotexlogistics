"use client";

import { motion, Variants } from "framer-motion";
import { Plane, Truck, Ship, Warehouse, ArrowRight } from "lucide-react";

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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: "Express Shipping",
      text: "Time-critical international delivery for documents and parcels.",
      color: "from-blue-500/20",
    },
    {
      icon: Truck,
      title: "Road Freight",
      text: "Reliable and efficient ground transportation across regions.",
      color: "from-orange-500/20",
    },
    {
      icon: Ship,
      title: "Ocean Cargo",
      text: "Cost-effective sea freight solutions for large-volume shipments.",
      color: "from-cyan-500/20",
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      text: "Secure storage, inventory management, and global distribution.",
      color: "from-emerald-500/20",
    },
  ];

  return (
    <section className="relative py-32 bg-slate-50 overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-yellow-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-yellow-600 uppercase mb-4">
              Our Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
              Comprehensive Logistics <br />
              <span className="text-slate-400">For a Connected World.</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="group flex items-center gap-2 font-bold text-slate-900 hover:text-yellow-600 transition-colors">
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map(({ icon: Icon, title, text, color }, index) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-500"
            >
              {/* Card Numbering (Watermark) */}
              <span className="absolute top-6 right-8 text-6xl font-black text-slate-50 group-hover:text-yellow-50 transition-colors duration-500 select-none">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br ${color} to-transparent mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className="w-7 h-7 text-slate-800" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                  {title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {text}
                </p>
                
                {/* Minimal "Learn More" link */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors pointer-events-none">
                  Discover More
                  <div className="h-px w-4 bg-slate-300 group-hover:w-8 group-hover:bg-slate-900 transition-all" />
                </div>
              </div>

              {/* Hover Border Glow (Top Only) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.75 bg-yellow-400 group-hover:w-1/2 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}