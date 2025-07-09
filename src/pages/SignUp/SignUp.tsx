import { SignUpForm } from '@/components';
import styles from './SignUp.module.css';
import { NavLink } from 'react-router';

export const SignUp = () => {
  return (
    <section className={styles.form_wrapper}>
      {/*<h2>Sign Up</h2> | <h2>Verify Your Email</h2>*/}
      <SignUpForm />
      <NavLink to="/sign-in">I already have an account</NavLink>
    </section>
  );
};
