import React from 'react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
import ScrollLock from 'react-scrolllock';

import { useUI } from '@components/ui/context';
import { Button, Dropdown } from '@components/ui';

import customDatasetList from '@data/customDatasetList.json';
import publicDatasetList from '@data/publicDatasetList.json';

interface Props {
  className?: string;
  containerClassName?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  show: boolean;
  onConfirm: (datasetName: string) => void;
  close: () => void;
}

const uploadSorts: SelectItem[] = [
  { label: 'Local', value: 'local' },
  { label: 'Custom', value: 'custom' },
  { label: 'Public', value: 'public' },
];

// TODO: add fake-loading for refresh button?
const UploadDataModal: React.FC<Props> = ({
  className,
  containerClassName,
  containerProps,
  show,
  onConfirm,
  close,
  ...props
}) => {
  const { dataset, setDataset } = useUI();
  const [currentSort, setCurrentSort] = React.useState<SelectItem>(
    uploadSorts[0],
  );

  const handleClear = React.useCallback(() => {
    setCurrentSort(uploadSorts[0]);
  }, []);

  return (
    <Transition
      show={show}
      className={cn(containerClassName, 'fixed z-10 inset-0 overflow-y-hidden')}
      {...containerProps}
    >
      <ScrollLock isActive={show} />
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-40 text-center sm:block sm:p-0">
        <Transition.Child
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          className={cn(
            'inline-flex flex-col align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6',
            {
              'h-64': currentSort.value === 'local',
              'h-96': currentSort.value === 'custom',
              'h-128': currentSort.value === 'public',
            },
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          enter="eease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className={cn(className, 'flex-grow')} {...props}>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 capitalize"
                  id="modal-headline"
                >
                  {(() => {
                    if (currentSort.value === 'local')
                      return 'upload Local data';
                    if (currentSort.value === 'custom')
                      return 'choose data from my library';
                    if (currentSort.value === 'public')
                      return 'choose data from public dataset list';
                  })()}
                </h3>
                <Dropdown
                  items={uploadSorts}
                  currentItem={currentSort}
                  onSelect={(item) => setCurrentSort(item)}
                />
              </div>
              {currentSort.value === 'local' && (
                <div className="mt-2">
                  <Button className="text-gray-900" color="white">
                    Choose File
                  </Button>
                </div>
              )}
              {currentSort.value === 'custom' && (
                <div className="mt-2">
                  <ul className="space-y-1 mt-4 flex-grow overflow-y-auto">
                    {customDatasetList.map((customDataset, idx) => (
                      <li key={`custom-dataset-${idx}`}>
                        <button
                          className={cn(
                            'w-full inline-flex justify-between py-2 px-2.5 rounded-md',
                            {
                              'hover:bg-lightBlue-300 hover:text-white':
                                dataset !== customDataset.name,
                              'bg-primary text-white font-semibold':
                                dataset === customDataset.name,
                            },
                          )}
                          onClick={() => setDataset(customDataset.name)}
                        >
                          <span>&middot; {customDataset.name}</span>
                          <span>({customDataset.description})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {currentSort.value === 'public' && (
                <div className="mt-2">
                  <ul className="space-y-1 mt-4 flex-grow overflow-y-auto">
                    {publicDatasetList.map((publicDataset, idx) => (
                      <li key={`public-dataset-${idx}`}>
                        <button
                          className={cn(
                            'w-full inline-flex justify-between py-2 px-2.5 rounded-md',
                            {
                              'hover:bg-lightBlue-300 hover:text-white':
                                dataset !== publicDataset.name,
                              'bg-primary text-white font-semibold':
                                dataset === publicDataset.name,
                            },
                          )}
                          onClick={() => setDataset(publicDataset.name)}
                        >
                          <span>&middot; {publicDataset.name}</span>
                          <span>({publicDataset.description})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between pl-1 pr-2 text-lg">
            <span>Selected: </span>
            <span>{dataset ?? 'NULL'}</span>
          </div>
          <div className="mt-2 sm:mt-4 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              className={cn(
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm',
                {
                  'bg-primary hover:bg-lightBlue-500 sm:col-start-2': true,
                },
              )}
              disabled={dataset === null}
              onClick={() => {
                onConfirm(dataset ?? 'NULL');
                setTimeout(() => handleClear(), 200);
                close();
              }}
            >
              Confirm
            </Button>
            <Button
              color="white"
              className={cn(
                'mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:text-sm',
                {
                  'sm:col-start-1': true,
                },
              )}
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default UploadDataModal;
