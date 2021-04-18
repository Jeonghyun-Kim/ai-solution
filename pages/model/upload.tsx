import React from 'react';
import { useRouter } from 'next/router';

// components
import { Button, Input, Select } from '@components/ui';
import BrowseModelListItem from '@components/custom/BrowseListItem';
import { useUI } from '@components/ui/context';
import useUser from '@lib/useUser';

const selectItems = [
  { label: 'Local', value: 'local' },
  { label: 'Visual', value: 'visual' },
];

const browseModelItems: BrowseItem[] = [
  {
    title: 'Transformer',
    description: 'created by Google on 2018.',
    task: 'Word Embedding',
    createdBy: 'Google',
  },
  {
    title: 'Transformer',
    description: 'created by Google on 2018.',
    task: 'Word Embedding',
    createdBy: 'Google',
  },
  {
    title: 'Transformer',
    description: 'created by Google on 2018.',
    task: 'Word Embedding',
    createdBy: 'Google',
  },
  {
    title: 'Transformer',
    description: 'created by Google on 2018.',
    task: 'Word Embedding',
    createdBy: 'Google',
  },
];

const ModelUploadPage = () => {
  const router = useRouter();
  const [currentSort, setCurrentSort] = React.useState<'local' | 'visual'>(
    'local',
  );
  const [file, setFile] = React.useState<File | null>(null);

  const { setTitle } = useUI();

  useUser({ redirectTo: '/' });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto py-16">
        <div className="grid grid-cols-2 gap-8" style={{ height: 620 }}>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Upload Model</h1>
              <Select
                className="w-32"
                items={selectItems.map((item, idx) => ({
                  ...item,
                  key: `selectItem-${idx}`,
                }))}
                selectedValue={currentSort}
                onSelect={(item) => setCurrentSort(item.value as never)}
              />
            </div>
            <div className="mt-6">
              <Input
                label="Name"
                placeholder="Specify your models's name here."
              />
            </div>
            <div className="mt-6">
              <Button
                color="white"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                Choose Folder (zip)
              </Button>
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="mt-6 space-y-4">
              <p className="font-medium ">Seleted: {file?.name}</p>
              <p>Size: {file?.size.toLocaleString()} Bytes</p>
            </div>
            <div className="flex-grow" />
            <div className="flex justify-end space-x-6">
              <Button
                className="px-16"
                size="lg"
                color="white"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                className="px-16"
                size="lg"
                disabled={!file}
                onClick={() => {
                  setTitle('BERT');
                  router.push('/model/overview');
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            <div>
              <h2 className="text-xl font-semibold">Browse Model</h2>
              <h4 className="mt-4 text-gray-600 text-lg">
                Choose state-of-the-art AI models
              </h4>
            </div>
            <div className="my-6 overflow-y-auto" style={{ height: 420 }}>
              <ul className="grid grid-cols-2 gap-4">
                {[...browseModelItems, ...browseModelItems].map(
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
                  Browse All AI Models &gt;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUploadPage;
