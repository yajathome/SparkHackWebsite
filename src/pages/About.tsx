import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, BookOpen, Rocket, Lightbulb, Code, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            About SparkHack
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            An interschool hackathon dedicated to inspiring the next generation of innovators
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-indigo-900/30 shadow-xl"
          >
            <BookOpenText className="h-12 w-12 text-indigo-500 mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Inspired by Wings of Fire</h2>
            <p className="text-gray-300">
              SparkHack draws inspiration from Dr. APJ Abdul Kalam's autobiography "Wings of Fire," 
              embracing his vision of empowering youth through education, innovation, and 
              determination. We believe in nurturing the spark of creativity in every student.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-indigo-900/30 shadow-xl"
          >
            <BookOpen className="h-12 w-12 text-indigo-500 mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">School Mission</h2>
            <p className="text-gray-300">
              In alignment with our school's mission to provide comprehensive education that goes 
              beyond textbooks, SparkHack creates an environment where students can apply classroom 
              knowledge to real-world challenges, fostering practical skills and innovative thinking.
            </p>
          </motion.div>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          What Makes SparkHack Special
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Rocket className="h-10 w-10 text-indigo-500" />}
            title="Innovation Focus"
            description="SparkHack encourages students to think outside the box and develop creative solutions to real-world problems."
            delay={0.5}
          />
          
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-indigo-500" />}
            title="Collaboration"
            description="Teams from different schools come together, sharing diverse perspectives and skills to achieve common goals."
            delay={0.6}
          />
          
          <FeatureCard 
            icon={<Code className="h-10 w-10 text-indigo-500" />}
            title="Technical Skills"
            description="Participants enhance their coding, design, and problem-solving abilities in a supportive, learning-focused environment."
            delay={0.7}
          />
          
          <FeatureCard 
            icon={<Lightbulb className="h-10 w-10 text-indigo-500" />}
            title="Learning Outcomes"
            description="Beyond technical skills, students develop critical thinking, time management, and presentation abilities."
            delay={0.8}
          />
          
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-indigo-500" />}
            title="Mentorship"
            description="Expert mentors guide teams throughout the hackathon, providing valuable insights and encouragement."
            delay={0.9}
          />
          
          <FeatureCard 
            icon={<Rocket className="h-10 w-10 text-indigo-500" />}
            title="Future Ready"
            description="SparkHack prepares students for future academic and career opportunities in technology and innovation."
            delay={1.0}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-indigo-900/30 shadow-xl text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
          <p className="text-gray-300">
            SparkHack aims to inspire the next generation of innovators by providing a platform 
            where students can explore their potential, collaborate with peers, and transform their 
            ideas into reality. We believe that every student has the capacity to create meaningful change, 
            and we're committed to nurturing that spark of creativity and innovation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default About;