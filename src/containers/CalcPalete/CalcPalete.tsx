import React from 'react';
import DragItemContainer from '../DragItemContainer/DragItemContainer';
import { useCalcItemsRender } from '../../hooks';
import { useAppSelector } from '../../store';
import { Paper } from '../../components';
import { CalcBlocksNames, DraggableItem } from '../../types';
import './CalcPalete.css';

const dragableBlocks: DraggableItem[] = [
  { id: 1, name: CalcBlocksNames.DISPLAY },
  { id: 2, name: CalcBlocksNames.OPERATIONS },
  { id: 3, name: CalcBlocksNames.NUMPAD },
  { id: 4, name: CalcBlocksNames.EQUAL_BUTTON },
];

const CalcPalete = () => {
  const { renderElement } = useCalcItemsRender();
  const { constructorModeEnable, droppedItems } = useAppSelector((state) => state.constructorReducer);

  return (
    <div className="palete">
      {constructorModeEnable && (
        <>
          {dragableBlocks.map((item, idx) => (
            <DragItemContainer
              key={item.id}
              desk="palete"
              index={idx}
              item={item}
              disabled={!!droppedItems.find((el) => el.id === item.id)}
            >
              <Paper hide={!!droppedItems.find((el) => el.id === item.id)}>
                {renderElement(item)}
              </Paper>
            </DragItemContainer>
          ))}
        </>
      )}
    </div>
  );
};

export default CalcPalete;
