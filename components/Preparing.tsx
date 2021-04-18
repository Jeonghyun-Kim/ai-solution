import React from 'react';
import NextLink from 'next/link';

import { Button } from '@components/ui';

const PreparingPage = () => {
  return (
    <div className="relative h-full mx-auto max-w-lg px-6 sm:px-8 pt-8 sm:pt-12 text-center">
      <img
        className="w-full object-contain"
        alt="Preparing services."
        src="/images/preparing.png"
        width={500}
        height={463}
      />
      <h1 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-bold">
        This page is currently not available.
      </h1>
      <div className="mt-4 sm:mt-6 flex justify-center">
        <NextLink href="/">
          <Button>Back to Home</Button>
        </NextLink>
      </div>
    </div>
  );
};

export default PreparingPage;
