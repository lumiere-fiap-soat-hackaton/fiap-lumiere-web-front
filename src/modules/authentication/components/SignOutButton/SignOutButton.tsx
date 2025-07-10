import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignOut } from '@/modules/authentication/hooks';

const SignOutButton = () => {
  const navigate = useNavigate();
  const { signOutAuthenticatedUser } = useSignOut();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(async () => {
    try {
      event?.preventDefault();
      setError(null);

      await signOutAuthenticatedUser();
      navigate('/');
    } catch (err) {
      setError((err as Error).message || 'Sign out failed');
      console.log('Error on user sign-in:', err);
    }
  }, [navigate, signOutAuthenticatedUser]);

  return (
    <>
      {error && <div>{error}</div>}
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
};

export default SignOutButton;