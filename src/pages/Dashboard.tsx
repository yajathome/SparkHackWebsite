import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  useEffect(() => {
    fetchProjects();
  }, [user]);
  
  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateProject = async (data: Partial<Project>) => {
    if (!user) return;
    
    try {
      const newProject = {
        ...data,
        user_id: user.id,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('projects')
        .insert([newProject]);
      
      if (error) throw error;
      
      toast.success('Project submitted successfully!');
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to submit project');
    }
  };
  
  const handleEditProject = async (data: Partial<Project>) => {
    if (!editingProject || !user) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', editingProject.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast.success('Project updated successfully!');
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };
  
  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId)
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        toast.success('Project deleted successfully!');
        fetchProjects();
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Dashboard</h1>
            <p className="text-gray-400">Manage your hackathon project submissions</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setShowForm(true)}
            className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Plus size={18} />
            <span>Submit New Project</span>
          </motion.button>
        </div>
        
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-10 border border-indigo-900/30 shadow-xl text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">No Projects Yet</h2>
            <p className="text-gray-300 mb-6">
              You haven't submitted any projects yet. Click the button above to create your first project!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              <Plus size={18} />
              <span>Submit New Project</span>
            </button>
          </motion.div>
        ) : (
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
                onEdit={() => setEditingProject(project)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </motion.div>
        )}
        
        {/* Create/Edit Project Modal */}
        <AnimatePresence>
          {(showForm || editingProject) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
              >
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
                  }}
                  className="absolute top-4 right-4 p-2 bg-slate-700 rounded-full text-gray-300 hover:text-white hover:bg-slate-600 transition-colors duration-300 z-10"
                >
                  <X size={20} />
                </button>
                
                <ProjectForm
                  onSubmit={editingProject ? handleEditProject : handleCreateProject}
                  initialData={editingProject || {}}
                  isEditing={!!editingProject}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;