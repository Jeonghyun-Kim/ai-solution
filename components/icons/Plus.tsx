import React from 'react';

interface Props {
  className?: string;
}

const Plus: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 6V12M12 12V18M12 12H18M12 12L6 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default React.memo(Plus);
