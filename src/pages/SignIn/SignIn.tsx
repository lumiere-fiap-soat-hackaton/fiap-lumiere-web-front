import { SignInForm } from '@/components';
import styles from './SignIn.module.css';
import { NavLink } from 'react-router';

export const SignIn = () => {
  return (
    <section className={styles.form_wrapper}>
      <h2>Sign in</h2>
      <SignInForm />
      <NavLink to="/sign-up">Create an account</NavLink>
    </section>
  );
};
