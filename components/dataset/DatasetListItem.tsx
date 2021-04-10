import React from 'react';

interface Props {
  dataset: DatasetItem;
}

const DatasetListItem: React.FC<Props> = ({ dataset }) => {
  return (
    <div className="rounded-lg shadow-md bg-white">
      <div className="border-b border-gray-300 px-4 py-2">
        <h3 className="text-lg font-semibold line-clamp-1">{dataset.title}</h3>
      </div>
      <div className="p-4 h-44">
        <h4 className="underline font-semibold mb-2">Description</h4>
        <p className="whitespace-pre-line line-clamp-3">
          {dataset.description}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <h4 className="underline font-semibold mb-2">Deploy</h4>
            <p>{dataset.template.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Last Edited</h4>
            <p>{dataset.lastEdited}</p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Created</h4>
            <p>{dataset.created}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetListItem;
