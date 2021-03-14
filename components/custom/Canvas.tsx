import React from 'react';
import cn from 'classnames';

import { useUI } from '@components/ui/context';

import { Play, X } from '@components/icons';

type Props = (
  | {
      variant: 'augmentation';
      dataset: string | null;
      augmentations: Augmentation[];
    }
  | {
      variant: 'preprocess';
      dataset: string | null;
      preprocesses: Preprocess[];
    }
) & {
  className?: string;
};

const Canvas: React.FC<Props> = ({ className, ...props }) => {
  const { removeAugmentation, removePreprocess } = useUI();
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const dataArray = React.useMemo(() => {
    if (props.variant === 'augmentation') return props.augmentations;

    return props.preprocesses;
  }, [props]);

  const [blockWidth, setBlockWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (canvasRef.current?.clientWidth !== undefined)
      setBlockWidth(
        dataArray.length
          ? canvasRef.current?.clientWidth / (dataArray.length * 2 + 2)
          : 324,
      );
  }, [dataArray, props]);

  if (props.dataset === null)
    return (
      <div className={cn(className, 'grid place-items-center text-xl')}>
        Choose or upload dataset to start.
      </div>
    );

  return (
    <div ref={canvasRef} className={cn(className, 'relative')}>
      <h4 className="absolute top-4 right-8 text-2xl font-bold capitalize">
        {props.variant}
      </h4>

      {/* divder */}
      <div className="w-full h-1/2 border-t-2 border-gray-500 absolute left-0 bottom-0 -z-10" />

      {/* start block */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 my-auto h-24 bg-gray-200 rounded-r-xl shadow-md',
          {
            'text-xs': dataArray.length > 3,
            'text-sm': dataArray.length === 3,
            'text-md': dataArray.length === 2,
            'text-lg': dataArray.length === 1,
            'text-xl': dataArray.length === 0,
          },
        )}
        style={{ width: blockWidth / 2 }}
      >
        <div className="relative w-full h-full p-2 grid place-items-center overflow-auto">
          {props.variant === 'augmentation' ? props.dataset : 'data_2'}
        </div>
      </div>
      <span
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{ left: blockWidth / 2 }}
      >
        <Play className="w-6 h-6 -ml-2 mt-1" />
      </span>

      {/* data array */}
      {dataArray.map((data: Augmentation | Preprocess, idx: number) => (
        <div
          key={`${props.variant}-${idx}`}
          className={cn(
            'absolute top-0 bottom-0 my-auto h-24 bg-gray-200 rounded-xl shadow-md',
            {
              'text-xs': dataArray.length > 3,
              'text-sm': dataArray.length === 3,
              'text-md': dataArray.length === 2,
              'text-lg': dataArray.length === 1,
              'text-xl': dataArray.length === 0,
            },
          )}
          style={{ left: (1.5 + 2 * idx) * blockWidth, width: blockWidth }}
        >
          <div className="relative w-full h-full p-2 grid place-items-center overflow-auto">
            {data.name}
            <button
              className="absolute top-1 right-1"
              onClick={() => {
                if (props.variant === 'augmentation')
                  return removeAugmentation(idx);

                return removePreprocess(idx);
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}

      {/* arrows */}
      {Array.from({ length: dataArray.length }, (_, idx) => (
        <>
          <span
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-4"
            style={{ left: (1.5 + 2 * idx) * blockWidth }}
          >
            <Play className="w-6 h-6 mt-1" />
          </span>
          <span
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1.5"
            style={{ left: (2.5 + 2 * idx) * blockWidth }}
          >
            <Play className="w-6 h-6 mt-1" />
          </span>
        </>
      ))}

      {/* end block */}
      <span
        className="absolute top-1/2 transform -translate-y-1/2 translate-x-1.5"
        style={{ right: blockWidth / 2 }}
      >
        <Play className="w-6 h-6 mt-1" />
      </span>
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 my-auto h-24 bg-gray-200 rounded-l-xl shadow-md',
          {
            'text-xs': dataArray.length > 3,
            'text-sm': dataArray.length === 3,
            'text-md': dataArray.length === 2,
            'text-lg': dataArray.length === 1,
            'text-xl': dataArray.length === 0,
          },
        )}
        style={{ width: blockWidth / 2 }}
      >
        <div className="relative w-full h-full p-2 grid place-items-center overflow-auto">
          {props.variant === 'augmentation' ? 'data_2' : 'data_3'}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
