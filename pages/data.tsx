import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Button, Modal } from '@components/ui';
import UploadDataModal from '@components/modals/UploadData';

import { Duplicate, Scissors, Upload } from '@components/icons';

import augmentations from '@data/augmentation.json';
import preprocesses from '@data/preprocess.json';
import ChevronDoubleRight from '@components/icons/ChevronDoubleRight';

const DataPage = () => {
  const router = useRouter();
  const [modalFlags, setModalFlags] = React.useState<{
    upload: boolean;
    success: boolean;
  }>({
    upload: false,
    success: false,
  });
  const [selected, setSelected] = React.useState<DataProcessItem | null>(null);
  const [dataset, setDataset] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<{ save: boolean }>({
    save: false,
  });

  return (
    <>
      <div className="h-full flex">
        {/* list area */}
        <div className="bg-gray-50 w-60 border-r border-gray-200 grid grid-rows-2">
          {/* augmentation */}
          <div className="py-2 px-3 overflow-y-auto overscroll-contain">
            <div className="flex space-x-2 items-center mt-4">
              <Duplicate className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Augmentation</h2>
            </div>
            <ul className="space-y-1 mt-4">
              {augmentations.map((augmentation, idx) => (
                <li key={`augmentation-${idx}`}>
                  <button
                    className={cn('w-full text-left py-2 px-2.5 rounded-md', {
                      'bg-primary text-white font-semibold':
                        selected?.name === augmentation.name,
                      'hover:bg-lightBlue-300 hover:text-white':
                        selected?.name !== augmentation.name,
                    })}
                    onClick={() => {
                      setSelected({ ...augmentation, variant: 'augmentation' });
                    }}
                  >
                    - {augmentation.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* preprocess */}
          <div className="border-t border-gray-300 py-2 px-3 overflow-y-auto overscroll-contain">
            <div className="flex space-x-2 items-center mt-4">
              <Scissors className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Preprocess</h2>
            </div>
            <ul className="space-y-1 mt-4">
              {preprocesses.map((preprocess, idx) => (
                <li key={`preprocess-${idx}`}>
                  <button
                    className={cn('w-full text-left py-2 px-2.5 rounded-md', {
                      'bg-primary text-white font-semibold':
                        selected?.name === preprocess.name,
                      'hover:bg-lightBlue-300 hover:text-white':
                        selected?.name !== preprocess.name,
                    })}
                    onClick={() => {
                      setSelected({ ...preprocess, variant: 'preprocess' });
                    }}
                  >
                    - {preprocess.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* canvas area */}
        <div className="flex-grow grid grid-rows-2">
          {/* canvas 1 */}
          <div></div>
          {/* canvas 2 */}
          <div className="border-t border-gray-300"></div>
        </div>
        {/* right section */}
        <div className="w-96 border-l border-gray-300 flex flex-col">
          {/* choose data button area */}
          <div className="py-4 px-6 flex flex-col justify-center items-center">
            <Button
              className="w-full justify-center text-xl font-semibold space-x-4"
              size="xl"
              onClick={() =>
                setModalFlags((prev) => ({ ...prev, upload: true }))
              }
            >
              <Upload className="w-6 h-6" />
              <span>Upload / Choose Data</span>
            </Button>
            {dataset === null ? (
              <p className="mt-3">Choose dataset first.</p>
            ) : (
              <div className="mt-3 self-stretch flex justify-between">
                <span>Selected Dataset:</span>
                <span>{dataset}</span>
              </div>
            )}
          </div>
          {/* divider */}
          <div className="relative mt-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xl font-semibold">
                Details
              </span>
            </div>
          </div>
          {/* Details area */}
          <div className="p-4 flex-grow overflow-y-auto">
            {selected === null ? (
              <div className="w-full h-full grid place-items-center">
                <p className="text-lg font-semibold">
                  To see the details,
                  <br />
                  select one from the list.
                </p>
              </div>
            ) : (
              <div>
                <h5 className="text-lg font-semibold text-center">
                  {selected.details.title}
                </h5>
                <p className="mt-3">
                  {selected.details.description ||
                    `There's no additional description.`}
                </p>
              </div>
            )}
          </div>
          {/* divider */}
          <div className="relative mt-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="py-4 px-6">
            <Button
              className="w-full justify-center text-xl font-semibold space-x-4"
              size="xl"
              disabled={loading.save}
              onClick={() => {
                setLoading((prev) => ({ ...prev, save: true }));
                sessionStorage.setItem(
                  '@data',
                  JSON.stringify({
                    dataset,
                  }),
                );
                setTimeout(
                  () => setModalFlags((prev) => ({ ...prev, success: true })),
                  1000,
                );
              }}
            >
              <span>Save and Select Model {loading.save && '...'}</span>
              <ChevronDoubleRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
      <UploadDataModal
        show={modalFlags.upload}
        close={() =>
          setModalFlags((prev) => ({
            ...prev,
            upload: false,
          }))
        }
        onConfirm={(item) => setDataset(item)}
      />
      <Modal
        show={modalFlags.success}
        close={() => setModalFlags((prev) => ({ ...prev, success: false }))}
        title="Dataset successfully saved!"
        content="You can now select learning models."
        actionButton={{
          label: 'Go to Select Models',
          onClick: () => router.push('/model'),
        }}
      />
    </>
  );
};

export default DataPage;
