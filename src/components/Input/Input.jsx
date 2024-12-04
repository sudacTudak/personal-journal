import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { isValid, className, appearance, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(className, styles['input'], {
        [styles['input-title']]: appearance === 'title',
        [styles['invalid']]: isValid === undefined ? false : !isValid
      })}
      {...props}
    />
  );
});

export default Input;
