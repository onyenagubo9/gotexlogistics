"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Calculator } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-yellow-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-yellow-400 uppercase bg-yellow-400/10 border border-yellow-400/20 rounded-full">
            Global Logistics Excellence
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Ship With <span className="text-yellow-400">Confidence?</span>
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience lightning-fast delivery and military-grade tracking. 
            Join over 10,000+ businesses shipping smarter today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-8 py-4 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              <Search className="w-5 h-5" />
              Track Shipment
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              <Calculator className="w-5 h-5 text-slate-400" />
              Get a Quote
              <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
            </motion.button>
          </div>

          {/* Social Proof / Trust Pilot style text */}
          <p className="mt-8 text-sm text-slate-500 italic">
            No credit card required • Instant setup • 24/7 Support
          </p>
        </motion.div>
      </div>
    </section>
  );
}