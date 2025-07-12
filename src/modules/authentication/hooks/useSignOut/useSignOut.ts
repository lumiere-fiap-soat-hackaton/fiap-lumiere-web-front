export const useSignOut = () => {
  const signOutAuthenticatedUser = async (): Promise<boolean> => {
    const response = await fetch(`server/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData ?? 'Error occurred during sign-out');
    }

    return response.ok;
  };

  return { signOutAuthenticatedUser };
};
