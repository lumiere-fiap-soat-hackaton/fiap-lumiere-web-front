import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './SignInForm.module.css';

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`API_BASE_URL/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Sign in failed');
        return;
      }

      navigate('/home');
    } catch (err) {
      setError('An error occurred during sign in');
      console.error(err);
    }
  };

  return (
    <form className={styles.sign_in_form} onSubmit={handleSignIn}>
      {error && <div className={styles['error-message']}>{error}</div>}
      <input
        type="email"
        placeholder="E-mail"
        name="username"
        autoComplete="username"
        required
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button type="submit" className={styles.sign_in_form}>Sign in</button>
    </form>
  );
}
