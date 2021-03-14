import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { useUI } from '@components/ui/context';
import { Button, Modal } from '@components/ui';
import UploadDataModal from '@components/modals/UploadData';

import {
  Duplicate,
  Scissors,
  Upload,
  ChevronDoubleRight,
  Plus,
} from '@components/icons';

import augmentationList from '@data/augmentation.json';
import preprocessList from '@data/preprocess.json';
import { Canvas } from '@components/custom';

const DataPage = () => {
  const router = useRouter();
  const {
    dataset,
    setDataset,
    augmentations,
    addAugmentation,
    preprocesses,
    addPreprocess,
    saveLearningProcess,
    restoreLearningProcess,
  } = useUI();
  const [modalFlags, setModalFlags] = React.useState<{
    upload: boolean;
    success: boolean;
    alert: boolean;
  }>({
    upload: false,
    success: false,
    alert: false,
  });
  const [alertInfo, setAlertInfo] = React.useState<{
    title: string;
    content: string;
  }>({ title: '', content: '' });
  const [selected, setSelected] = React.useState<DataProcessItem | null>(null);
  const [loading, setLoading] = React.useState<{ save: boolean }>({
    save: false,
  });

  React.useEffect(() => {
    restoreLearningProcess();
  }, [restoreLearningProcess]);

  const clearTimeouts = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      let id = window.setTimeout(() => {}, 0);
      while (id--) window.clearTimeout(id);
    }
  }, []);

  const openAlert = React.useCallback(
    (title: string, content: string) => {
      clearTimeouts();
      setAlertInfo({ title, content });
      setModalFlags((prev) => ({ ...prev, alert: true }));
    },
    [clearTimeouts],
  );

  const closeAlert = React.useCallback(() => {
    setModalFlags((prev) => ({ ...prev, alert: false }));
    setTimeout(() => setAlertInfo({ title: '', content: '' }), 2000);
  }, []);

  return (
    <>
      <div className="h-full flex">
        {/* list area */}
        <div className="bg-gray-50 w-60 border-r border-gray-200 grid grid-rows-2">
          {/* augmentation */}
          <div className="py-2 px-3 flex flex-col">
            <div className="flex space-x-2 items-center mt-4">
              <Duplicate className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Augmentation</h2>
            </div>
            <ul className="space-y-1 mt-4 flex-grow overflow-y-auto overscroll-contain">
              {augmentationList.map((augmentation, idx) => (
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
          <div className="border-t border-gray-300 py-2 px-3 flex flex-col">
            <div className="flex space-x-2 items-center mt-4">
              <Scissors className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Preprocess</h2>
            </div>
            <ul className="space-y-1 mt-4 flex-grow overflow-y-auto overscroll-contain">
              {preprocessList.map((preprocess, idx) => (
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
          <Canvas
            variant="augmentation"
            augmentations={augmentations}
            dataset={dataset}
          />
          {/* canvas 2 */}
          <Canvas
            className="border-t border-gray-300"
            variant="preprocess"
            dataset={dataset}
            preprocesses={preprocesses}
          />
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
              <div className="mt-4 self-stretch flex justify-between">
                <span>Selected Dataset:</span>
                <span>{dataset}</span>
              </div>
            )}
          </div>
          {/* divider */}
          <div className="relative">
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
          {selected !== null && (
            <Button
              size="lg"
              className="space-x-2 self-center ml-4 mb-2"
              onClick={() => {
                if (selected.variant === 'augmentation') {
                  if (augmentations.length === 5) {
                    return openAlert(
                      'Exceeding the maximum limit (5)',
                      'Please remove one or more augmentations if you really want to add this.',
                    );
                  }
                  addAugmentation(selected);

                  return setSelected(null);
                }

                if (preprocesses.length === 3) {
                  return openAlert(
                    'Exceeding the maximum limit (3)',
                    'Please remove one or more preprocesss if you really want to add this.',
                  );
                }

                addPreprocess(selected);

                return setSelected(null);
              }}
            >
              <Plus className="w-6 h-6" />
              <span className="pr-2">INSERT</span>
            </Button>
          )}
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
              disabled={dataset === null || loading.save}
              onClick={() => {
                if (dataset === null)
                  return setModalFlags((prev) => ({ ...prev, alert: true }));
                setLoading((prev) => ({ ...prev, save: true }));
                saveLearningProcess();
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
      <Modal
        variant="alert"
        show={modalFlags.alert}
        close={() => closeAlert()}
        title={alertInfo.title}
        content={alertInfo.content}
        actionButton={{
          label: 'OK',
          onClick: () => closeAlert(),
        }}
      />
    </>
  );
};

export default DataPage;
