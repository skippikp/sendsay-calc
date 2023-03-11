export type DraggableItem = {
  id: number;
  name: CalcBlocksNames;
};

export type DragItem = {
  component: DraggableItem;
  idx: number;
};

export enum Operations {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = 'x',
  DIVIDE = '/',
}

export enum CalcBlocksNames {
  DISPLAY = 'Display',
  OPERATIONS = 'Operations',
  NUMPAD = 'Numpad',
  EQUAL_BUTTON = 'EqualButton',
}