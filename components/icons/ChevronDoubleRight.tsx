import React from 'react';

interface Props {
  className?: string;
}

const ChevronDoubleRight: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 5L20 12L13 19M5 5L12 12L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default React.memo(ChevronDoubleRight);
