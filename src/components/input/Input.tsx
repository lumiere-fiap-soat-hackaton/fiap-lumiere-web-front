
import styles from './Input.module.css';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
          ref={ref}
          {...props}
        />
        {error && (
          <p className={styles.errorText}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
