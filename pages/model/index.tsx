import React from 'react';
import NextLink from 'next/link';

// components
import { Button, Link } from '@components/ui';
import ModelListItem from '@components/model/ModelListItem';
import { useUI } from '@components/ui/context';
import useUser from '@lib/useUser';

const models: ModelItem[] = [
  {
    title: 'BERT',
    description: 'Bidirectional transformer',
    deploy: 2,
    parameters: 138400000,
    lastEdited: '3 hours ago',
  },
  {
    title: 'ResNet',
    description: 'Residual CNN',
    deploy: 0,
    parameters: 57100000,
    lastEdited: '6 days ago',
  },
  {
    title: 'ResNet_Big',
    description: 'Residual CNN with more parameters',
    deploy: 5,
    parameters: 359100000,
    lastEdited: 'April, 20',
  },
];

const ModelListPage = () => {
  const { setTitle } = useUI();

  useUser({ redirectTo: '/' });

  return (
    <div className="min-h-full bg-gray-100 pb-40">
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-10 flex justify-between items-center">
          <h3 className="text-xl font-medium capitalize">Search</h3>
          <NextLink href="/model/upload">
            <Button className="capitalize" color="lightBlue">
              Upload Model
            </Button>
          </NextLink>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-8">
          {[...models, ...models, ...models, ...models].map((model, idx) => (
            <li key={`model-${idx}`}>
              <Link
                href="/model/overview"
                onClick={() => {
                  setTitle(model.title);
                }}
              >
                <ModelListItem model={model} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ModelListPage.variant = 'user';
export default ModelListPage;
