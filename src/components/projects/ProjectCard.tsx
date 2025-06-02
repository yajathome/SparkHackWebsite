import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Github, Youtube, ExternalLink } from 'lucide-react';


type ProjectCardProps = {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete,
  isAdmin = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-900/30 shadow-xl group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.screenshot_url || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70" />
        
        {(onEdit || onDelete) && (
          <div className="absolute top-2 right-2 flex space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors duration-300"
              >
                <Edit size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors duration-300"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        
        {isAdmin && project.user_email && (
          <p className="text-indigo-400 text-sm mb-2">By: {project.user_email}</p>
        )}
        
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-700 text-white text-sm hover:bg-indigo-600 transition-colors duration-300"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          
          <a 
            href={project.youtube_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-700 text-white text-sm hover:bg-red-600 transition-colors duration-300"
          >
            <Youtube size={14} />
            <span>YouTube</span>
          </a>
          
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-700 text-white text-sm hover:bg-green-600 transition-colors duration-300"
            >
              <ExternalLink size={14} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;