import React from 'react';

interface Props {
  model: BrowseModelItem;
}

const BrowseModelListItem: React.FC<Props> = ({ model }) => {
  return (
    <div className="rounded-lg shadow-md bg-white border border-gray-200">
      <div className="border-b border-gray-300 px-4 py-2">
        <h3 className="text-lg font-semibold line-clamp-1">{model.title}</h3>
      </div>
      <div className="p-4 h-36 flex flex-col">
        <p className="whitespace-pre-line line-clamp-3">{model.description}</p>
        <p className="mt-4 line-clamp-2 break-words">Task: {model.task}</p>
        <span className="flex-grow" />
        <p className="text-gray-600 font-medium text-sm text-right">
          Created By: {model.createdBy}
        </p>
      </div>
    </div>
  );
};

export default BrowseModelListItem;
