import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DashNav from '../components/DashNav'
import ProjectCard from '../components/ProjectModal/ProjectCard'
import AddProjectModal from '../components/ProjectModal/AddProjectModal'
import ProjectDetailsModal from '../components/ProjectModal/ProjectDetailsModal'
import { SiOpenproject } from 'react-icons/si'
import { IoMdCloudUpload } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTaskOpen, setTaskOpen] = useState(false);

  useEffect(() => {
    // Fetch projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  const handleAddProject = (project) => {
    const newProjects = [...projects, project];
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));

    toast("New Project Added!" , {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: 'green' },
      theme: 'colored',
      style: { background: 'white' },
    }
  );
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
      toast('Project Deleted!' , {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        progressStyle: { background: 'red' },
        theme: 'colored',
        style: { background: 'white' },
      }
    );
  };

  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    toast("Updated!", {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: 'blue' },
      theme: 'colored',
      style: { background: 'white' },
    }
  );
  };

  const handleFeatureClick = (projectId) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? { ...project, isFeatured: !project.isFeatured }
        : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    const x = projects.filter((project) =>
      projectId === project.id ? project.isFeatured : false
    );

    if(x == false){
      toast('Project Featured!' , {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        progressStyle: { background: 'black' },
        theme: 'colored',
        style: { background: 'white' },
      });
    }
  };

  const rProjects = [...projects].sort((a, b) => {
    // First, sort by featured status
    if (b.isFeatured !== a.isFeatured) {
      return b.isFeatured - a.isFeatured;
    }
    // If both projects have the same featured status, sort by creation date (newest first)
    return b.id - a.id;
  });

  const sProjects = projects.sort((a, b) => b.isFeatured - a.isFeatured);


  return (
    <div className="max-w-screen-xl	mx-auto font-inter">
      <Helmet>
        <title>TaskFlow</title>
      </Helmet>
      <DashNav/>
      <div className="container mx-auto p-4">
      <div className='bg-white flex justify-center border border-4 border-black w-full text-black px-6 py-5 rounded-md mb-4'>
        <button
        onClick={() => setModalOpen(true)}
        className="bg-black flex items-center text-white px-6 py-2 rounded-md shadow-lg"
      >
        <IoMdCloudUpload className='text-white text-xl me-3'/> Add New Project
      </button>
</div>
      {isModalOpen && (
        <AddProjectModal
          closeModal={() => setModalOpen(false)}
          addProject={handleAddProject}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rProjects.map((project) => (
          <ProjectCard
          key={project.id}
          project={project}
          deleteProject={handleDeleteProject}
          updateProject={handleUpdateProject}
          onFeatureClick={handleFeatureClick}
          />
        ))}
      </div>
    </div>
    <ToastContainer position="bottom-right" theme="light"/>
    </div>
  )
}

export default Projects