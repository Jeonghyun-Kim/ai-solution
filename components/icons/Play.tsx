import React from 'react';

interface Props {
  className?: string;
}

const Play: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.394 13.045L7.8495 18.583C7.0395 19.0525 6 18.484 6 17.5375V6.46155C6 5.51655 7.038 4.94655 7.8495 5.41755L17.394 10.9555C17.5783 11.0607 17.7314 11.2128 17.8379 11.3963C17.9445 11.5797 18.0006 11.7881 18.0006 12.0003C18.0006 12.2125 17.9445 12.4209 17.8379 12.6043C17.7314 12.7878 17.5783 12.9399 17.394 13.045Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default React.memo(Play);
