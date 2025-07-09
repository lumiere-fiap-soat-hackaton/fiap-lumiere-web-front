import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

const SignOutButton = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('API_BASE_URL/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Sign in failed');
        return;
      }
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [navigate]);
  return (
    <>
      {error && <div>{error}</div>}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default SignOutButton;