import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';

import styles from './SignOutButton.module.css';
import Button from '@/components/button/Button.tsx';
import { useAuth } from '@/contexts/AuthContext.tsx';

const SignOutButton = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      const success = await signOut();

      if (!success) {
        console.error('Erro ao finalizar a sessão. Tente mais tarde');
        return;
      }

      navigate('/', { replace: true, flushSync: true, state: {} });
    } catch (err) {
      console.log('Error on user sign-in:', err);
    }
  }, [navigate, signOut]);

  return (
    <Button size="sm" onClick={handleSignOut} className={styles.logoutButton}>
      <LogOut size={16} className={styles.logoutIcon} />
      <span>Sair</span>
    </Button>
  );
};

export default SignOutButton;