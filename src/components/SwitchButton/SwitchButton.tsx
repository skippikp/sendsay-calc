import React from 'react';
import clsx from 'clsx';
import './SwitchButton.css';

type Props = {
  onClick: () => void;
  isActive: boolean;
  label: string;
  icon?: JSX.Element;
};

export const SwitchButton = ({ onClick, isActive, icon, label }: Props) => {
  return (
    <label className={clsx('switch-button', isActive && 'switch-button_active')}>
      {icon && (
        <div className={clsx('switch-button__icon', isActive && 'switch-button__icon_active')}>
          {icon}
        </div>
      )}
      <input
        type="radio"
        className="switch-button__radio"
        checked={isActive}
        onChange={onClick}
      />
      {label}
    </label>
  );
};

export default SwitchButton;
