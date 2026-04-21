"use client";

import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative bg-yellow-400 text-slate-900 pt-24 pb-10 overflow-hidden">
      {/* Visual Texture: Subtle diagonal lines to give the yellow depth */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40H40Z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
        }}
      />

      {/* Scroll to Top Button */}
      <motion.button 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-950 text-yellow-400 rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-all duration-300 group z-20"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
                Gotex<span className="text-slate-800/40">Logistics</span>
              </h3>
              <div className="h-1.5 w-12 bg-slate-950 mt-2" />
            </div>
            <p className="text-slate-900 font-medium leading-relaxed max-w-xs">
              Redefining global supply chains with speed, intelligence, and 
              unwavering reliability since 1998.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(15, 23, 42, 1)", color: "#facc15" }}
                  className="p-3 bg-slate-950/10 text-slate-900 rounded-xl transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-8 text-slate-950/60">
              Core Services
            </h4>
            <ul className="space-y-4 font-bold text-lg">
              {["Air Express", "Road Freight", "Ocean Cargo", "Warehousing"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:pl-2 transition-all duration-300 hover:text-slate-700 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-8 text-slate-950/60">
              Our Company
            </h4>
            <ul className="space-y-4 font-bold text-lg">
              {["About Us", "Our Careers", "Sustainability", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:pl-2 transition-all duration-300 hover:text-slate-700 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="bg-slate-950/5 p-6 rounded-3xl border border-slate-950/10">
            <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-6 text-slate-950/60">
              Newsletter
            </h4>
            <p className="text-sm font-medium mb-4 text-slate-800">
              Get the latest logistics insights and shipping updates.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter email"
                className="w-full bg-white/50 border-2 border-transparent rounded-2xl px-4 py-3 focus:outline-none focus:border-slate-950 placeholder:text-slate-500 font-bold transition-all"
              />
              <button className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group">
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <p className="text-slate-800/70">
            © 2026 Gotex Logistics Solutions. Engineered for speed.
          </p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}