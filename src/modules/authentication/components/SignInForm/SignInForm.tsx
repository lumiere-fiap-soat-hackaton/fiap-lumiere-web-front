import * as React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { useSignIn } from '@/modules/authentication/hooks';
import Input from '@/components/input/Input.tsx';
import styles from './SignInForm.module.css';
import Button from '@/components/button/Button.tsx';

export function SignInForm() {
  const navigate = useNavigate();
  const { signInWithEmailAndPassword } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);

      if (!email) {
        setErrors(prev => ({ ...prev, email: 'E-mail é obrigatório' }));
        return;
      }

      if (!password) {
        setErrors(prev => ({ ...prev, password: 'Senha é obrigatória' }));
        return;
      }

      const success = await signInWithEmailAndPassword(email, password);

      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ email: 'E-mail ou senha inválidos' });
      }
    } catch (err) {
      setErrors({ email: 'E-mail ou senha inválidos' });
      //setErrors((err as Error).message || 'Sign in failed');
      console.log('Error on user sign-in:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.glassCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Bem-vindo
            </h2>
            <p className={styles.subtitle}>
              Acesse sua conta para continuar
            </p>
          </div>

          {/* TODO: fix input icons position when error message is visible */}
          {/* TODO: fix input background color when auto-complete */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} />
              <Input
                type="email"
                placeholder="Seu e-mail"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputWithIcon}
                error={errors.email}
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.inputWithIcon} ${styles.inputWithIconRight}`}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleButton}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              style={{ width: '100%' }}
            >
              Entrar
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Não tem uma conta?{' '}
              <NavLink
                to="/sign-up"
                className={styles.footerLink}
              >
                Cadastre-se
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}