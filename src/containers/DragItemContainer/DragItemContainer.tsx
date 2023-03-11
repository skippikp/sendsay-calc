import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeItem } from '../../store/ConstructorSlice';
import { useItemDnD } from '../../hooks';
import { DraggableItem } from '../../types';
import './DragItemContainer.css';

type Props = {
  item: DraggableItem;
  index: number;
  desk: 'palete' | 'constructor';
  canDrag?: boolean;
  disabled?: boolean;
};

const DragItemContainer: FC<PropsWithChildren<Props>> = (props) => {
  const { item, index, desk, canDrag = true, disabled, children } = props;

  const { ref, isOver, fromTop, isDragging } = useItemDnD(item, index, desk, canDrag);
  const dispatch = useAppDispatch();

  const { constructorModeEnable } = useAppSelector((state) => state.constructorReducer);

  const handleRemoveItem = () => {
    if (!constructorModeEnable) {
      return;
    }
    dispatch(removeItem(item.id));
  };

  return (
    <div
      ref={ref}
      onDoubleClick={handleRemoveItem}
      className={clsx({
        'drag-container': constructorModeEnable,
        'drag-container_dragging': isDragging && desk === 'constructor',
        'drag-container_not-draggable': constructorModeEnable && !canDrag,
        'drag-container_disabled': disabled
      })}
    >
      {isOver && !fromTop && <span className="drop-highlight_top "></span>}
      {children}
      {isOver && fromTop && <span className="drop-highlight_bottom"></span>}
    </div>
  );
};

export default DragItemContainer;
