import React from 'react';
import { useRouter } from 'next/router';

// components
import { Button, Input } from '@components/ui';
import BrowseModelListItem from '@components/custom/BrowseListItem';
import { useUI } from '@components/ui/context';
import useUser from '@lib/useUser';

const browseProjectItems: BrowseItem[] = [
  {
    title: 'ImageRecognition',
    description: 'state-of-the-art AI model that can recognize 100 objects.',
    task: '',
    createdBy: 'James',
  },
  {
    title: 'ImageRecognition',
    description: 'state-of-the-art AI model that can recognize 100 objects.',
    task: '',
    createdBy: 'James',
  },
  {
    title: 'ImageRecognition',
    description: 'state-of-the-art AI model that can recognize 100 objects.',
    task: '',
    createdBy: 'James',
  },
  {
    title: 'ImageRecognition',
    description: 'state-of-the-art AI model that can recognize 100 objects.',
    task: '',
    createdBy: 'James',
  },
];

const ProjectUploadPage = () => {
  const router = useRouter();
  const { setTitle } = useUI();
  const [projectName, setProjectName] = React.useState<string>('');

  useUser({ redirectTo: '/' });

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto py-16">
        <div className="grid grid-cols-2 gap-8" style={{ height: 620 }}>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            <div className="flex flex-col h-full">
              <div>
                <h2 className="text-xl font-semibold">Project Name</h2>
                <Input
                  className="mt-4"
                  placeholder="Specify yout project name here"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
              </div>
              <div className="flex-grow mt-6 flex flex-col">
                <h2 className="text-xl font-semibold">
                  Description (optional)
                </h2>
                <textarea className="mt-4 flex-grow rounded-md border-gray-300 focus:ring-lightBlue-400 focus:border-lightBlue-400" />
              </div>
              <div className="mt-6 text-right">
                <Button
                  className="px-16"
                  size="lg"
                  disabled={!projectName}
                  onClick={() => {
                    setTitle('Financial Data Sentiment Analysis');
                    router.push('/dataset/overview');
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            <div>
              <h2 className="text-xl font-semibold">Clone Template</h2>
              <h4 className="mt-4 text-gray-600 text-lg">
                Choose pre-made AI projects
              </h4>
            </div>
            <div className="my-6 overflow-y-auto" style={{ height: 420 }}>
              <ul className="grid grid-cols-2 gap-4">
                {[...browseProjectItems, ...browseProjectItems].map(
                  (model, idx) => (
                    <li key={`browseModel-${idx}`}>
                      <BrowseModelListItem item={model} />
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <button className="hover:opacity-80">
                <span className="text-gray-600 text-xl">
                  Browse All AI Projects &gt;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUploadPage;
