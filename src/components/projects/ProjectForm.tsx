import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';


type ProjectFormProps = {
  onSubmit: (data: Partial<Project>) => void;
  initialData?: Partial<Project>;
  isEditing?: boolean;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  onSubmit, 
  initialData = {}, 
  isEditing = false 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<Partial<Project>>({
    defaultValues: initialData
  });
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEditing ? 'Edit Project' : 'Submit a New Project'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Project Title *
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="Enter project title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="Describe your project"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="screenshot_url" className="block text-sm font-medium text-gray-300 mb-1">
            Screenshot URL *
          </label>
          <input
            id="screenshot_url"
            type="url"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="https://example.com/screenshot.jpg"
            {...register('screenshot_url', { 
              required: 'Screenshot URL is required',
              pattern: {
                value: /^https?:\/\/.+/i,
                message: 'Must be a valid URL'
              }
            })}
          />
          {errors.screenshot_url && (
            <p className="mt-1 text-sm text-red-400">{errors.screenshot_url.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-gray-300 mb-1">
            GitHub Repository URL *
          </label>
          <input
            id="github_url"
            type="url"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="https://github.com/username/repo"
            {...register('github_url', { 
              required: 'GitHub URL is required',
              pattern: {
                value: /^https?:\/\/(www\.)?github\.com\/.+/i,
                message: 'Must be a valid GitHub URL'
              }
            })}
          />
          {errors.github_url && (
            <p className="mt-1 text-sm text-red-400">{errors.github_url.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-300 mb-1">
            YouTube Demo URL *
          </label>
          <input
            id="youtube_url"
            type="url"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="https://youtube.com/watch?v=..."
            {...register('youtube_url', { 
              required: 'YouTube URL is required',
              pattern: {
                value: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/i,
                message: 'Must be a valid YouTube URL'
              }
            })}
          />
          {errors.youtube_url && (
            <p className="mt-1 text-sm text-red-400">{errors.youtube_url.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="demo_url" className="block text-sm font-medium text-gray-300 mb-1">
            Live Demo URL (Optional)
          </label>
          <input
            id="demo_url"
            type="url"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="https://your-demo-site.com"
            {...register('demo_url', { 
              pattern: {
                value: /^https?:\/\/.+/i,
                message: 'Must be a valid URL'
              }
            })}
          />
          {errors.demo_url && (
            <p className="mt-1 text-sm text-red-400">{errors.demo_url.message}</p>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? 'Submitting...' : isEditing ? 'Update Project' : 'Submit Project'}
      </button>
    </motion.form>
  );
};

export default ProjectForm;