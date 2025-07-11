import * as React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { useSignUp } from '@/modules/authentication/hooks';
import styles from './SignUpForm.module.css';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

export const SignUpForm = () => {
  const { signUpWithEmailAndPassword, sendSignUpVerificationCode } = useSignUp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBackToSignUp = () => {
    setStep(1);
    navigate('sign-up', { state: { email, step: 1 } });
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      if (password.length < 6) {
        setErrors(prev => ({ ...prev, password: 'Senha deve ter pelo menos 6 caracteres' }));
        return;
      }
      if (password !== confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Senhas não coincidem' }));
        return;
      }

      const success = await signUpWithEmailAndPassword(email, password);

      if (success) {
        setStep(2);
        navigate('/sign-up', { state: { email, step: 2 } });
      }
    } catch (err) {
      setErrors({ email: 'Sign up - create user failed' });
      //setError((err as Error).message || 'Sign up - create user failed');
      console.error('Error on user sign-up:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      if (!verificationCode) {
        setErrors(prev => ({ ...prev, verificationCode: 'Código é obrigatório' }));
        return;
      }
      if (verificationCode.length !== 6) {
        setErrors(prev => ({ ...prev, verificationCode: 'Código deve ter 6 dígitos' }));
        return;
      }

      const success = await sendSignUpVerificationCode(email, verificationCode);

      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ verificationCode: 'Código inválido' });
      }
    } catch (err) {
      setErrors({ email: 'Sign up - confirm user failed' });
      //setError((err as Error).message || 'Sign up - confirm user failed');
      console.log('Error on account verification:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.glassCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {step === 1 ? 'Criar Conta' : 'Verificação'}
            </h2>
            {step === 1 ? (
              <p className={styles.subtitle}>
                Preencha os dados para começar
              </p>
            ) : (
              <p className={styles.subtitle}>
                Enviamos um código para {email}
              </p>
            )}
          </div>

          {step === 1 ? (
            <form onSubmit={handleCreateUser} className={styles.form}>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} />
                <Input
                  type="email"
                  name="username"
                  placeholder="Seu e-mail"
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
                  name="password"
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

              <div className={styles.inputGroup}>
                <Lock className={styles.inputIcon} />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${styles.inputWithIcon} ${styles.inputWithIconRight}`}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.toggleButton}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                style={{ width: '100%' }}
              >
                Continuar
                <ArrowRight style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleConfirmUser} className={styles.form}>
              <div className={styles.verificationStep}>
                <div className={styles.verificationIcon}>
                  <Mail className={styles.verificationIconInner} />
                </div>
              </div>

              <Input
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={styles.verificationInput}
                error={errors.verificationCode}
                maxLength={6}
              />

              <div className={styles.testCodeHint}>
                Use o código <span className={styles.testCodeValue}>123456</span> para testar
              </div>

              <div className={styles.buttonGroup}>
                <Button
                  type="submit"
                  size="lg"
                  loading={isLoading}
                  style={{ width: '100%' }}
                >
                  Verificar Código
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleBackToSignUp}
                  style={{ width: '100%' }}
                >
                  Voltar
                </Button>
              </div>
            </form>
          )}

          {step === 1 ? (
            <div className={styles.footer}>
              <p className={styles.footerText}>
                Já tem uma conta?{' '}
                <NavLink to="/sign-in" className={styles.footerLink}>
                  Faça login
                </NavLink>
              </p>
            </div>
          ) : (
            <div className={styles.footer}>
              <p className={styles.footerText}>
                Não recebeu o código?{' '}
                <NavLink to="/#" className={styles.footerLink}>
                  Enviar novamente
                </NavLink>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};