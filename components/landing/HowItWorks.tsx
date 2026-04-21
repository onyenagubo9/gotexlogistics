"use client";

import { motion, Variants } from "framer-motion";
import { PackagePlus, Truck, MapPin, CheckCircle } from "lucide-react";

/* ---------------- ANIMATION VARIANTS ---------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom "out-expo" ease for smoother landing
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function HowItWorks() {
  const steps = [
    {
      icon: PackagePlus,
      title: "Create Shipment",
      text: "Enter shipment details and generate a tracking number instantly.",
    },
    {
      icon: Truck,
      title: "We Pick It Up",
      text: "Our logistics network collects your package from the origin.",
    },
    {
      icon: MapPin,
      title: "Track in Real-Time",
      text: "Monitor your shipment’s journey with live tracking updates.",
    },
    {
      icon: CheckCircle,
      title: "Delivered Safely",
      text: "Your package arrives securely at its final destination.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      {/* Background Image with refined overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950 z-10" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-10 opacity-[0.15] mask-[radial-gradient(ellipse_at_center,black,transparent)]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0\' 0\' 60\' 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48L54 54L48 54\' fill=\'none\' stroke=\'%23fbbf24\' stroke-width=\'1\'/%3E%3C/svg%3E")' }} 
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Shipping <span className="text-yellow-400">Simplified</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            From the first click to the final knock, we’ve streamlined every 
            mile of the journey for total peace of mind.
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
        >
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-yellow-400/30 to-transparent z-0" />

          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              variants={stepVariants}
              className="relative group z-10"
            >
              <div className="flex flex-col items-center">
                {/* Icon Circle */}
                <div className="relative mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10 shadow-2xl group-hover:border-yellow-400/50 transition-colors duration-300"
                  >
                    <Icon className="w-10 h-10 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 text-slate-900 font-bold text-sm flex items-center justify-center shadow-lg ring-4 ring-slate-950">
                    0{index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:translate-y-1">
                  <h3 className="font-bold text-xl text-white mb-3 tracking-wide group-hover:text-yellow-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}