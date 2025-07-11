export const useSignIn = () => {
  const signInWithEmailAndPassword = async (username: string, password: string): Promise<boolean> => {
    const response = await fetch(`server/auth/sign-in`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData ?? 'Error occurred during sign-in');
    }

    return response.ok;
  };

  return { signInWithEmailAndPassword };
};
