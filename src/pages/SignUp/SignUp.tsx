import styles from './SignUp.module.css';
import { NavLink } from 'react-router';
import { SignUpForm } from '@/modules/authentication/components';

export const SignUp = () => {
  return (
    <section className={styles.form_wrapper}>
      <SignUpForm />
      <NavLink to="/sign-in">I already have an account</NavLink>
    </section>
  );
};
