import React from 'react';
import NextLink from 'next/link';

// components
import { Button, Link } from '@components/ui';
import DatasetListItem from '@components/dataset/DatasetListItem';
import { useUI } from '@components/ui/context';
import useUser from '@lib/useUser';

const datasets: DatasetItem[] = [
  {
    title: 'COCO',
    description: 'Microsoft Common Object Image Dataset',
    template: 11,
    lastEdited: '3 hours ago',
    created: 'April, 4',
  },
  {
    title: 'ImageNet',
    description: '2 million Images with 150 classes',
    template: 6,
    lastEdited: 'April, 11',
    created: 'Jan, 11',
  },
  {
    title: 'SQuAD',
    description: 'Stanform Question Answering Dataset',
    template: 3,
    lastEdited: 'Mar, 27',
    created: 'Jan, 3',
  },
];

const DatasetListPage = () => {
  const { setTitle } = useUI();

  useUser({ redirectTo: '/' });

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-10 flex justify-between items-center">
          <h3 className="text-xl font-medium capitalize">Search</h3>
          <NextLink href="/dataset/upload">
            <Button className="capitalize" color="lightBlue">
              Upload Data
            </Button>
          </NextLink>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-8">
          {[...datasets, ...datasets, ...datasets, ...datasets].map(
            (dataset, idx) => (
              <li key={`dataset-${idx}`}>
                <Link
                  href="/dataset/overview"
                  onClick={() => {
                    setTitle(dataset.title);
                  }}
                >
                  <DatasetListItem dataset={dataset} />
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

DatasetListPage.variant = 'user';
export default DatasetListPage;
