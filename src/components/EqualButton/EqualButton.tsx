import React from 'react';
import Button from '../Button/Button';
import './EqualButton.css';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const EqualButton = ({ onClick, disabled }: Props) => {
  return (
    <div className="equal-button-container">
      <Button disabled={disabled} onClick={onClick} variant="contained">
        =
      </Button>
    </div>
  );
};

export default EqualButton;
