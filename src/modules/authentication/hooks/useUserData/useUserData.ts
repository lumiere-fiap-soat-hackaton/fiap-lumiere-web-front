export const useUserData = () => {
  const fetchAuthenticatedUserData = async (): Promise<Record<string, string>> => {
    const response = await fetch(`server/auth/user-data`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData ?? 'An error occurred during fetching user data');
    }

    return response.json();

  };

  return { fetchAuthenticatedUserData };
};
