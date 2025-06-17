import React from 'react';
import { motion } from 'framer-motion';
import image_anshuman from '../images/Anshuman_photo.png';
import image_divya from '../images/Divyamam_photo.png';
import image_sudarshan from '../images/sudershan_photo.png';
import image_swathi from '../images/Swathimam_photo.jpg';
import image_saanvi from '../Images/saanvi_photo.png';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [ 
  {
    id: 1,
    name: 'P Kashyap',
    role: 'Event Coordinator',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Anshuman Verma',
    role: 'Technical Mentor',
    imageUrl: image_anshuman
  },
  {
    id: 3,
    name: 'Yajat Singhal',
    role: 'Design Mentor',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'Divya Ma\'am',
    role: 'Project Manager',
    imageUrl: image_divya
  },
  {
    id: 5,
    name: 'R Sri Sudarshan',
    role: 'Backend Developer',
    imageUrl: image_sudarshan
  },
  {
    id: 6,
    name: 'Swathi Ma\'am',
    role: 'Mentor ',
    imageUrl: image_swathi
  }, 
  {
    id: 7,
    name: 'Saanvi N',
    role: 'Designation mentor',
    imageUrl: image_saanvi
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TeamSection: React.FC = () => {
  const firstRows = teamMembers.slice(0, 4);
  const lastRow = teamMembers.slice(4);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Meet Our Team
        </motion.h2>
        
        {/* First 4 members in a 4-column grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {firstRows.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>

        {/* Last 3 members centered using flex */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-8"
        >
          {lastRow.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <motion.div 
      variants={item}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-indigo-900/30 group w-full max-w-sm"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-indigo-400">{member.role}</p>
      </div>
    </motion.div>
  );
};

export default TeamSection;
