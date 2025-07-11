import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';

import { useSignOut } from '@/modules/authentication/hooks';
import styles from './SignOutButton.module.css';
import Button from '@/components/button/Button.tsx';

const SignOutButton = () => {
  const navigate = useNavigate();
  const { signOutAuthenticatedUser } = useSignOut();

  const handleSignOut = useCallback(async () => {
    try {
      const success = await signOutAuthenticatedUser();

      if (!success) {
        console.error('Failed to sign out user');
        return;
      }
      navigate('/');
    } catch (err) {
      console.log('Error on user sign-in:', err);
    }
  }, [navigate, signOutAuthenticatedUser]);

  return (
    <Button size="sm" onClick={handleSignOut} className={styles.logoutButton}>
      <LogOut size={16} className={styles.logoutIcon} />
      <span>Sair</span>
    </Button>
  );
};

export default SignOutButton;