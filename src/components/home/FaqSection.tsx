import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "What is SparkHack?",
    answer: "SparkHack is a 2-day interschool hackathon where students can collaborate, innovate, and learn while building projects. It's inspired by Dr. APJ Abdul Kalam's 'Wings of Fire' and aims to foster creativity and technical skills."
  },
  {
    id: 2,
    question: "Who can participate?",
    answer: "SparkHack is open to students from all participating schools. Teams can consist of 2-4 members, and students from different schools can form teams together."
  },
  {
    id: 3,
    question: "Do I need to know coding to participate?",
    answer: "While some coding knowledge is helpful, SparkHack welcomes participants with various skills including design, presentation, and problem-solving. Teams benefit from diverse skill sets!"
  },
  {
    id: 4,
    question: "What should I bring?",
    answer: "Bring your laptop, charger, any hardware you plan to use for your project, and lots of enthusiasm! Canteen will be available for purchase of food!"
  },
  {
    id: 5,
    question: "How does the judging work?",
    answer: "Projects will be judged based on innovation, technical complexity, design, practicality, and presentation. Our panel of judges includes industry professionals and educators."
  },
  {
    id: 6,
    question: "How do I contact the organizers?",
    answer: "You can contact Divya Ma'am via WhatsApp or email at the contact information provided on the homepage. Our team is ready to assist with any questions you might have!"
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqItem: React.FC<{ faq: FaqItem }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-slate-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-indigo-900/30"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
      >
        <h3 className="text-lg font-medium text-white">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-indigo-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-300">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqSection;