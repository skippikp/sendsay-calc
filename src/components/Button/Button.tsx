import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import './Button.css';

type Props = {
  onClick: () => void;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
};

export const Button: FC<PropsWithChildren<Props>> = ({ onClick, variant, disabled, children }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx('button', variant === 'contained' && 'button-contained')}
    >
      {children}
    </button>
  );
};

export default Button;
