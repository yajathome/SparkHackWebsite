import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase, Project } from '../lib/supabase';
import ProjectCard from '../components/projects/ProjectCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Admin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAllProjects();
  }, []);
  
  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:user_id (email)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
     
      const projectsWithEmail = data?.map(project => ({
        ...project,
        user_email: project.profiles?.email
      })) || [];
      
      setProjects(projectsWithEmail);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);
        
        if (error) throw error;
        
        toast.success('Project deleted successfully!');
        fetchAllProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage all project submissions</p>
        </motion.div>
        
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-10 border border-indigo-900/30 shadow-xl text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">No Projects Submitted</h2>
            <p className="text-gray-300">
              There are no project submissions yet. Check back later as participants begin submitting their work.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 p-6 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-indigo-900/30">
              <h2 className="text-xl font-semibold text-white mb-4">Project Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Total Projects" value={projects.length} />
                <StatCard 
                  title="Unique Participants" 
                  value={new Set(projects.map(p => p.user_id)).size} 
                />
                <StatCard 
                  title="Projects with Demo" 
                  value={projects.filter(p => p.demo_url).length} 
                />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDeleteProject(project.id)}
                  isAdmin
                />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-700/60 rounded-lg p-4 border border-indigo-900/30">
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default Admin;