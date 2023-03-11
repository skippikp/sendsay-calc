import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import './Paper.css';

type Props = {
  hide?: boolean;
};

export const Paper: FC<PropsWithChildren<Props>> = ({ children, hide }) => {
  return (
    <div className={clsx('p-1', !hide && 'paper')}>
      {children}
    </div>
  );
};

export default Paper;
