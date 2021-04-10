import React from 'react';
import cn from 'classnames';

interface Props {
  model: ModelItem;
}

const ModelListItem: React.FC<Props> = ({ model }) => {
  return (
    <div className="rounded-lg shadow-md bg-white">
      <div className="border-b border-gray-300 px-4 py-2">
        <h3 className="text-lg font-semibold line-clamp-1">{model.title}</h3>
      </div>
      <div className="p-4 h-44">
        <h4 className="underline font-semibold mb-2">Description</h4>
        <p className="whitespace-pre-line line-clamp-3">{model.description}</p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="underline font-semibold mb-2">Deploy</h4>
            <p
              className={cn({
                'text-green-500': model.deploy > 0,
                'text-red-500': model.deploy === 0,
              })}
            >
              {model.deploy.toLocaleString()}
            </p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Parameters</h4>
            <p>{(model.parameters / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <h4 className="underline font-semibold mb-2">Last Edited</h4>
            <p>{model.lastEdited}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelListItem;
