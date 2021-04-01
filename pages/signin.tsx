import React from 'react';
import { useRouter } from 'next/router';

// contexts
import { useUI } from '@components/ui/context';

// libraries
import signin from '@lib/signin';

const SigninPage = () => {
  const router = useRouter();

  const { mutateUser } = useUI();

  const handleSignin = React.useCallback(async () => {
    await signin();
    mutateUser();
  }, [mutateUser]);

  React.useEffect(() => {
    handleSignin();

    router.replace('/dashboard');
  }, [handleSignin, router]);

  return (
    <div className="mx-auto max-w-screen-lg text-2xl pb-24">loading...</div>
  );
};

export default SigninPage;
