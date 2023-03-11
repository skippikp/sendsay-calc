import React from 'react';
import Button from '../Button/Button';
import './Numpad.css';

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];

type Props = {
  onClick: (value: string) => void;
  disabled?: boolean;
};

export const Numpad = ({ onClick, disabled }: Props) => {
  return (
    <div className="numpad">
      {NUMBERS.map((item) => (
        <div key={item} className={`button_${item}`}>
          <Button disabled={disabled} onClick={() => onClick(item)}>
            {item}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Numpad;
