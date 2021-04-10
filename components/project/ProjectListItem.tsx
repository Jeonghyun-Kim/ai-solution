import React from 'react';

interface Props {
  project: ProjectItem;
}

const ProjectListItem: React.FC<Props> = ({ project }) => {
  return (
    <div className="rounded-lg shadow-md bg-white">
      <div className="border-b border-gray-300 px-4 py-2">
        <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
      </div>
      <div className="p-4 h-44">
        <h4 className="underline font-semibold mb-2">Description</h4>
        <p className="whitespace-pre-line line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="underline font-semibold mb-2">Team</h4>
            <p>{project.team.join(', ')}</p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Last Edited</h4>
            <p>{project.lastEdited}</p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Created</h4>
            <p>{project.created}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListItem;
