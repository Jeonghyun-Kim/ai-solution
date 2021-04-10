import React from 'react';
import { useRouter } from 'next/router';
// import { mutate } from 'swr';

// libraries
import signin from '@lib/signin';
import useUser from '@lib/useUser';

const SigninPage = () => {
  const router = useRouter();

  const { mutate } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  React.useEffect(() => {
    signin().then(() => mutate());
  }, [router, mutate]);

  return (
    <div className="mx-auto max-w-screen-lg text-2xl pb-24">loading...</div>
  );
};

export default SigninPage;
