import React from 'react';
import clsx from 'clsx';
import './Display.css';

type Props = {
  value: string;
};

export const Display = ({ value }: Props) => {
  return (
    <div
      className={clsx('display', value?.length > 9 ? 'fs-5 align-items-end' : 'align-items-center')}
    >
      {value}
    </div>
  );
};

export default Display;
