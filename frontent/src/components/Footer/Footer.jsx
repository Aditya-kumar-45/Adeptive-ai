import React from "react";
import { GraduationCap, Mail, MapPin, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-slate-900 text-white py-16 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                AI-Learn <span className="text-blue-400">Assistant</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              An adaptive AI-based learning assistant that personalizes your educational journey 
              from beginner to advanced levels using Google Gemini AI.
            </p>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-300">
                Final Year Project | B.Sc. Computer Science
              </p>
              <p className="text-xs text-slate-500">
                Sarhad College of Arts, Commerce and Science, Pune
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Features', 'Student Portal', 'Teacher Portal'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-600" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-sm">sarhad@college.edu</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-sm">+91 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Sarhad Campus, Pune</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 AI-Learn Assistant. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;