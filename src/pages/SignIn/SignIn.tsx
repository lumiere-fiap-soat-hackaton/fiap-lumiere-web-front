import styles from './SignIn.module.css';
import { NavLink } from 'react-router';
import { SignInForm } from '@/modules/authentication/components';

export const SignIn = () => {
  return (
    <section className={styles.form_wrapper}>
      <h2>Sign in</h2>
      <SignInForm />
      <NavLink to="/sign-up">Create an account</NavLink>
    </section>
  );
};
