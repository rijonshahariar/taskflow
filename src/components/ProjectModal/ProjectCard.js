import React, { useState } from 'react';
import ProjectDetailsModal from './ProjectDetailsModal';
import { FaPlay, FaRegFolderOpen, FaRegStar, FaStar } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiEdit3 } from "react-icons/fi";
import { toast } from 'react-toastify';
import ProjectTaskModal from './ProjectTaskModal';

const convertDate = (dateStr) => {
  if (!dateStr) return '';
  const dateParts = dateStr.split('-');
  if (dateParts.length !== 3) return 'Invalid date';
  const [year, month, day] = dateParts;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[parseInt(month) - 1];
  return `${day} ${monthName}, ${year}`;
};



const ProjectCard = ({ project, deleteProject, updateProject, onFeatureClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTaskOpen, setTaskOpen] = useState(false);

  const cardStyles = project.isFeatured ? "bg-yellow-50" : "bg-white";
  const buttonStyles = project.isFeatured ? "text-yellow-500" : "text-gray-700";
  const formattedDate = convertDate(project.deadline);

  return (
    <div className={`relative bg-white p-4 rounded-lg shadow-lg ${cardStyles}`}>
      <button
        className={`absolute top-auto right-5 text-xl rounded ${buttonStyles}`}
        onClick={() => onFeatureClick(project.id)}
      >
        {project.isFeatured ? <FaStar /> : <FaRegStar />}

      </button>
      <div className='flex items-center'>

        <h3 className="text-lg flex items-center font-bold mb-2"><FaRegFolderOpen className='mr-2'/>{project.name}...</h3>
        <button><FiEdit3 onClick={() => setModalOpen(true)} className='mb-2 text-blue-400 text-xl' /></button>
        <p className={`mb-2  ${project.status === 'Pending' && 'text-yellow-800 bg-yellow-100'} ${project.status === 'In progress' && 'text-blue-800 bg-blue-100'} ${project.status === 'Completed' && 'text-green-800 bg-green-100'} text-sm px-1 ms-4`}><span className='text-lg'>•</span> {project.status}</p>
      </div>
      <p className='text-sm text-gray-500'>Description:  {project.description
        ? project.description.length > 30
          ? `${project.description.slice(0, 30)}...`
          : project.description
        : 'No description available'}</p>
      {formattedDate ? (<p className='text-sm text-gray-500'>Deadline: {formattedDate}</p>) : (<p className='text-sm text-gray-500'>Deadline: Not available</p>)}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setTaskOpen(true)}
          className="text-black rounded"
        >
          <FaPlay />
        </button>
        <button
          onClick={() => deleteProject(project.id)}
          className="text-black text-2xl rounded"
        >
          <AiFillCloseCircle />
        </button>
      </div>

      {isModalOpen && (
        <ProjectDetailsModal
          project={project}
          closeModal={() => setModalOpen(false)}
          updateProject={updateProject}
        />
      )}

      {isTaskOpen && (
        <ProjectTaskModal
        projectId={project.id}
        project={project}
        closeModal={() => setTaskOpen(false)}
      />
      )}
    </div>
  );
};

export default ProjectCard;
