import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

// components
import { Button, Input, Select } from '@components/ui';
import BrowseModelListItem from '@components/custom/BrowseListItem';
import { useUI } from '@components/ui/context';
import Spinner from '@components/icons/Spinner';
import useUser from '@lib/useUser';

const selectItems = [
  { label: 'Local', value: 'local' },
  { label: 'Visual', value: 'visual' },
];

const selectTastItems = [{ label: 'Image Classification', value: 'imageCLF' }];

const browseModelItems: BrowseItem[] = [
  {
    title: 'Celeb A',
    description: 'Image of celebrity',
    task: 'Image clf',
    createdBy: 'John',
  },
  {
    title: 'Medical',
    description: 'Image of medical',
    task: 'obj detect',
    createdBy: 'Alex',
  },
  {
    title: 'Celeb A',
    description: 'Image of celebrity',
    task: 'Image clf',
    createdBy: 'John',
  },
  {
    title: 'Medical',
    description: 'Image of medical',
    task: 'obj detect',
    createdBy: 'Alex',
  },
];

const DatasetUploadPage = () => {
  const router = useRouter();
  const [currentSort, setCurrentSort] = React.useState<'local' | 'visual'>(
    'local',
  );
  const [file, setFile] = React.useState<File | null>(null);
  const [started, setStarted] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [datasetName, setDatasetName] = React.useState<string>('');

  const { setTitle } = useUI();

  useUser({ redirectTo: '/' });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const timer = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto py-16">
        <div className="grid grid-cols-2 gap-8" style={{ height: 620 }}>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Upload Data</h1>
              <Select
                className="w-32"
                items={selectItems}
                currentItem={
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  selectItems.find(({ value }) => value === currentSort)!
                }
                onSelect={(item) => setCurrentSort(item.value as never)}
              />
            </div>
            <div className="mt-6">
              <Select
                className="w-full"
                label="Task"
                items={selectTastItems}
                currentItem={selectTastItems[0]}
                onSelect={() => {}}
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
            <div className="h-11">
              {!started ? (
                <div className="flex justify-end space-x-6">
                  <Button
                    className="w-40 justify-center"
                    size="lg"
                    color="white"
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                  <Button
                    className="w-40 justify-center"
                    size="lg"
                    disabled={!file}
                    onClick={() => {
                      setStarted(true);
                      timer.current = setTimeout(() => {
                        setLoaded(true);
                      }, 3000);
                    }}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end items-center space-x-6">
                  <span className={cn({ hidden: loaded })}>Uploading...</span>
                  <Button
                    className="w-40 justify-center"
                    color={loaded ? 'lightBlue' : 'red'}
                    size="lg"
                    disabled={loaded}
                    onClick={() => {
                      setStarted(false);
                      if (timer.current) clearTimeout(timer.current);
                    }}
                  >
                    <Spinner
                      className={cn('animate-spin w-6 h-6 mr-4', {
                        hidden: loaded,
                      })}
                    />
                    <span>{loaded ? 'Done' : 'Cancel'}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg shadow-lg h-full bg-white py-6 px-8 flex flex-col">
            {!started ? (
              <div>
                <div>
                  <h2 className="text-xl font-semibold">Browse Dataset</h2>
                  <h4 className="mt-4 text-gray-600 text-lg">
                    Choose public/private dataset
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
                      Browse All AI Datasets &gt;
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div>
                  <h2 className="text-xl font-semibold">Dataset Name</h2>
                  <Input
                    className="mt-4"
                    placeholder="Specify yout dataset name here"
                    value={datasetName}
                    onChange={(e) => {
                      setDatasetName(e.target.value);
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
                    disabled={!loaded || !datasetName}
                    onClick={() => {
                      setTitle('ImageNet');
                      router.push('/dataset/overview');
                    }}
                  >
                    OK
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetUploadPage;
