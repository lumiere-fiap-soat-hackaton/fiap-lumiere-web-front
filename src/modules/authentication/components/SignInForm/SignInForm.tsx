import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './SignInForm.module.css';
import { useSignIn } from '@/modules/authentication/hooks';

export function SignInForm() {
  const navigate = useNavigate();
  const { signInWithEmailAndPassword } = useSignIn();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event: { preventDefault: () => void; }) => {
    try {
      event?.preventDefault();
      setError(null);

      await signInWithEmailAndPassword(email, password);
      navigate('/home');
    } catch (err) {
      setError((err as Error).message || 'Sign in failed');
      console.log('Error on user sign-in:', err);
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className={styles.sign_in_form}>Sign in</button>
    </form>
  );
}
