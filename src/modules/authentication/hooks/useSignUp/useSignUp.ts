export const useSignUp = () => {

  const signUpWithEmailAndPassword = async (username: string, password: string): Promise<boolean> => {
    const response = await fetch(`server/auth/sign-up/create`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData ?? 'An error occurred during sign-up');
    }

    return response.ok;
  };

  const sendSignUpVerificationCode = async (username: string, verifyCode: string): Promise<boolean> => {
    const response = await fetch('/server/auth/sign-up/confirm', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, verifyCode }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData ?? 'An error occurred during verification');
    }

    return  response.ok;
  };

  return { signUpWithEmailAndPassword, sendSignUpVerificationCode };
};


