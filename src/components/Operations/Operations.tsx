import React from 'react';
import Button from '../Button/Button';
import { Operations as OperationsEnum } from '../../types';
import './Operations.css';

const OPERATIONS = [
  OperationsEnum.DIVIDE,
  OperationsEnum.MULTIPLY,
  OperationsEnum.MINUS,
  OperationsEnum.PLUS,
];

type Props = {
  onClick: (operation: OperationsEnum) => void;
  disabled?: boolean;
};

export const Operations = ({ onClick, disabled }: Props) => {
  return (
    <div className="operations">
      {OPERATIONS.map((item) => (
        <Button key={item} disabled={disabled} onClick={() => onClick(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Operations;
