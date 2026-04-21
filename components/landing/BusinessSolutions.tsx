"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, 
  PackageCheck, 
  BarChart3, 
  Plug, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck 
} from "lucide-react";

export default function BusinessSolutions() {
  const features = [
    {
      icon: PackageCheck,
      title: "Bulk & Contract Shipping",
      text: "Enterprise-grade logistics optimized for high-volume recurring shipments.",
      tags: ["Volume Discounts", "Priority Fleet"]
    },
    {
      icon: Plug,
      title: "Enterprise API Integration",
      text: "Seamlessly connect our delivery engine to your existing ERP or POS systems.",
      tags: ["Webhook Support", "SDKs"]
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      text: "Actionable insights through real-time telemetry and custom dashboards.",
      tags: ["Route Optimization", "ROI Tracking"]
    },
  ];

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      {/* 1. Advanced Background: Grid Pattern + Radial Glow */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          
          {/* Left Column: Feature Sets */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/15 text-yellow-800 text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enterprise Infrastructure</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Built for the <br />
                <span className="text-yellow-500">Global Scale.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                We provide more than just delivery; we provide a programmable logistics layer for businesses that never stop moving.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {features.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-8 rounded-3xl bg-white border border-slate-200/60 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/5 transition-all duration-500"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-700 group-hover:bg-yellow-400 group-hover:text-slate-900 transition-all duration-500 shrink-0 shadow-sm">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.text}</p>
                      <div className="flex flex-wrap gap-3">
                        {item.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md group-hover:bg-yellow-50 group-hover:text-yellow-700 transition-colors">
                            <CheckCircle2 className="w-3 h-3 text-yellow-500" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Advanced CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full relative"
          >
            {/* Animated Float Element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Globe2 className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Global Network</p>
                <p className="text-sm font-bold text-slate-900">Active in 120+ Cities</p>
              </div>
            </motion.div>

            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              {/* Internal Glow Effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_10%,#facc15_0%,transparent_40%)] opacity-20" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Ready to optimize your <span className="text-yellow-400">supply chain?</span>
                </h3>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Join industry leaders like <span className="text-white font-medium">TechCorp</span> and <span className="text-white font-medium">GlobalRetail</span> who use our API to move faster.
                </p>

                <div className="space-y-4">
                  <Link
                    href="/auth/register"
                    className="group flex items-center justify-center gap-3 bg-yellow-400 text-slate-900 px-10 py-5 rounded-2xl font-black hover:bg-yellow-300 transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(250,204,21,0.3)]"
                  >
                    Open Business Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors tracking-wide">
                    SCHEDULE A DEMO
                  </button>
                </div>
                
                {/* Metrics Grid */}
                <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 gap-10">
                  <div>
                    <div className="text-4xl font-black text-white italic">99<span className="text-yellow-400">.9</span>%</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-2">API Uptime SLA</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white italic">&lt;15<span className="text-yellow-400">m</span></div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-2">Avg. Response</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}