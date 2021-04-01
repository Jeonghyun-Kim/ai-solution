const signin: () => Promise<void> = async () => {
  const user = await new Promise((resolve) => {
    setTimeout(
      () => resolve({ _id: 'ai-solution', name: 'admin', profile: null }),
      300,
    );
  });

  sessionStorage.setItem('@user', JSON.stringify(user));
};

export default signin;
