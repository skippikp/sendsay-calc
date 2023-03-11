import React from 'react';
import { resetCalc } from '../../store/CalcSlice';
import { setConstructorMode } from '../../store/ConstructorSlice';
import { BracketsIcon, EyeIcon }from '../../assets/icons';
import { SwitchButton } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';
import './ModeSwitch.css';

export const ModeSwitch = () => {
  const dispatch = useAppDispatch();
  const { constructorModeEnable } = useAppSelector((state) => state.constructorReducer);

  const handleChangeMode = (active: boolean) => {
    if (constructorModeEnable === active) {
      return;
    }
    dispatch(resetCalc());
    dispatch(setConstructorMode(active));
  };

  return (
    <form className="switch-container">
      <SwitchButton
        label="Runtime"
        onClick={() => handleChangeMode(false)}
        isActive={!constructorModeEnable}
        icon={<EyeIcon />}
      />
      <SwitchButton
        label="Constructor"
        onClick={() => handleChangeMode(true)}
        isActive={constructorModeEnable}
        icon={<BracketsIcon />}
      />
    </form>
  );
};

export default ModeSwitch;
