import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Calendar, MapPin, Users } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const eventStartDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); 
const eventEndDate = new Date(Date.now() + 17 * 24 * 60 * 60 * 1000); 
const submissionDeadline = new Date(Date.now() + 16.5 * 24 * 60 * 60 * 1000); 

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
      
      
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Zap className="inline-block h-12 w-12 text-indigo-400 mb-4" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
        >
          SparkHack 2025
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          A 2-Day Interschool Hackathon to Ignite Innovation
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <EventDetail icon={<Calendar className="h-5 w-5 text-indigo-400" />} text="April 15-16, 2025" />
          <EventDetail icon={<MapPin className="h-5 w-5 text-indigo-400" />} text="School Auditorium" />
          <EventDetail icon={<Users className="h-5 w-5 text-indigo-400" />} text="Teams of 2-4" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="mb-8">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="School Logo" 
              className="h-24 mx-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Link 
              to="/register" 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Register Now
            </Link>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3 rounded-full bg-slate-800 text-white font-medium text-lg hover:bg-slate-700 transition-all duration-300"
            >
              Contact Divya Ma'am
            </a>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-1">
            <CountdownTimer targetDate={eventStartDate} label="Event Starts In" />
          </div>
          <div className="md:col-span-1">
            <CountdownTimer targetDate={eventEndDate} label="Event Ends In" />
          </div>
          <div className="md:col-span-1">
            <CountdownTimer targetDate={submissionDeadline} label="Submission Deadline" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EventDetail: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg border border-indigo-900/30">
      {icon}
      <span className="text-gray-200">{text}</span>
    </div>
  );
};

export default Hero;