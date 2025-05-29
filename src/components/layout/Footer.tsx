import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Mail, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-indigo-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                SparkHack
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              A 2-day interschool hackathon fostering innovation, collaboration, and learning.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Github size={18} />} href="https://github.com" />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/login">Sign In</FooterLink>
              <FooterLink to="/register">Register</FooterLink>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="#">FAQs</FooterLink>
              <FooterLink to="#">Rules</FooterLink>
              <FooterLink to="#">Schedule</FooterLink>
              <FooterLink to="#">Sponsors</FooterLink>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Whitefield Global School</p>
            <p className="text-gray-400 mb-2">Whitefield</p>
            <p className="text-gray-400 mb-2">Bangalore Karnataka 560066</p>
            <p className="text-gray-400">Contact Divya Ma'am!</p>
          </div>
        </div>
        
        <div className="border-t border-indigo-900/30 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SparkHack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;