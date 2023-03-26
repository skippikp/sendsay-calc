import { Operations } from '../types';
import { replaceFloatPoint } from './string';

export const INFINITE_VALUE = 'Не определено';
export const MAX_NUMBERS_LENGTH = 17;

type EvaluateOptions = {
  currentOperand: string;
  previousOperand: string;
  operation: Operations | null;
};

export const evaluate: (options: EvaluateOptions) => string = ({
  currentOperand,
  previousOperand,
  operation,
}) => {
  const prev = parseFloat(replaceFloatPoint(previousOperand || ''));
  const current = parseFloat(replaceFloatPoint(currentOperand || ''));
  if (isNaN(prev) || isNaN(current)) {
    return '0';
  }

  const prevNumbersAfterFloatPoint = prev.toString().split('.')[1]?.length || 0;
  const currentNumbersAfterFloatPoint = current.toString().split('.')[1]?.length || 0;
  const numbersAfterFloatPoint = Math.max(prevNumbersAfterFloatPoint, currentNumbersAfterFloatPoint);

  let computation;

  switch (operation) {
    case Operations.PLUS:
      computation = +(prev + current).toFixed(numbersAfterFloatPoint);
      break;
    case Operations.MINUS:
      computation = +(prev - current).toFixed(numbersAfterFloatPoint);
      break;
    case Operations.DIVIDE:
      computation = prev / current;
      break;
    case Operations.MULTIPLY:
      computation = +(prev * current).toFixed(numbersAfterFloatPoint);
      break;
    default:
      return '';
  }

  if (!isFinite(computation)) {
    return INFINITE_VALUE;
  }
  if (computation.toString().length > MAX_NUMBERS_LENGTH) {
    if (computation.toPrecision(MAX_NUMBERS_LENGTH).length > MAX_NUMBERS_LENGTH) {
      return replaceFloatPoint(roundBigNumber(computation.toString()));
    }
    return replaceFloatPoint(computation.toPrecision(MAX_NUMBERS_LENGTH));
  }

  return replaceFloatPoint(computation.toString());
};

export const roundBigNumber = (value: string) => {
  const lastChar = value[MAX_NUMBERS_LENGTH - 1];
  return (value.slice(0, MAX_NUMBERS_LENGTH - 1) + (Number(lastChar) + 1 || '')).slice(0, MAX_NUMBERS_LENGTH);
};
