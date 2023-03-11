import React from 'react';
import { AddImageIcon } from '../../assets/icons';
import { Paper } from '../../components';
import { useCalcItemsRender, useContainerDnD } from '../../hooks';
import { useAppSelector } from '../../store';
import { CalcBlocksNames } from '../../types';
import DragItemContainer from '../DragItemContainer/DragItemContainer';
import './DropDesk.css';

const DropDesk = () => {
  const { renderElement } = useCalcItemsRender();
  const { ref, isOver, droppedItem } = useContainerDnD();
  const { droppedItems } = useAppSelector((state) => state.constructorReducer);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: isOver && droppedItems.length === 0 ? '#f0f9ff' : '' }}
      className={droppedItems.length > 0 ? 'filled-container' : 'empty-container'}
    >
      {droppedItems.length > 0 ? (
        <>
          {isOver && droppedItem?.name === CalcBlocksNames.DISPLAY && (
            <span className="drop-highlight_top"></span>
          )}
          <div className="filled-container__content">
            {droppedItems.map((item, idx) => (
              <DragItemContainer
                key={item.id}
                canDrag={item.name !== CalcBlocksNames.DISPLAY}
                desk="constructor"
                index={idx}
                item={item}
              >
                <Paper hide={true}>{renderElement(item)}</Paper>
              </DragItemContainer>
            ))}
          </div>
          {isOver && droppedItem?.name !== CalcBlocksNames.DISPLAY && (
            <span className="drop-highlight_bottom"></span>
          )}
        </>
      ) : (
        <div className="empty-container__info">
          <AddImageIcon />
          <div className="empty-container__info__text">
            <span>Перетащите сюда</span>
            <p>
              любой элемент
              <br />
              из левой панели
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDesk;
