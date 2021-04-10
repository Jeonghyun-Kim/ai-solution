import React from 'react';

// components
import { Button, Link } from '@components/ui';
import ProjectListItem from '@components/project/ProjectListItem';
import { useUI } from '@components/ui/context';

const projects: ProjectItem[] = [
  {
    title: 'Financial Data Sentiment Analysis',
    description: 'Sentiment Analysis on Financial Data',
    team: ['James, Ryan'],
    lastEdited: '4 hours ago',
    created: 'April, 4',
  },
  {
    title: 'Medical Image Classification',
    description: 'Classify on Medical Image',
    team: ['David'],
    lastEdited: '13 hours ago',
    created: 'Mar, 10',
  },
  {
    title: 'Image Object Detection',
    description: 'Object Detection on Image Data',
    team: ['Alex, James'],
    lastEdited: '1 hour ago',
    created: 'April, 27',
  },
];

const ProjectListPage = () => {
  const { setTitle } = useUI();

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-10 flex justify-between items-center">
          <h3 className="text-xl font-medium capitalize">Search</h3>
          <Button className="capitalize" color="lightBlue">
            new project
          </Button>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-8">
          {[...projects, ...projects, ...projects, ...projects].map(
            (project, idx) => (
              <li key={`project-${idx}`}>
                <Link
                  href="/project/overview"
                  onClick={() => {
                    setTitle(project.title);
                  }}
                >
                  <ProjectListItem project={project} />
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

ProjectListPage.variant = 'user';
export default ProjectListPage;
