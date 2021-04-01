const signout: () => Promise<void> = async () => {
  await new Promise((resolve) => {
    sessionStorage.removeItem('@user');
    setTimeout(() => resolve(''), 300);
  });
};

export default signout;
