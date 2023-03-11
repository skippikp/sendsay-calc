import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setDroppedItems } from '../store/ConstructorSlice';
import { RootState } from '../store';
import { DragItem, DraggableItem, CalcBlocksNames } from '../types';

export const useItemDnD = <T extends HTMLDivElement>(
  item: DraggableItem,
  index: number,
  desk: 'palete' | 'constructor',
  canDrag?: boolean,
) => {
  const { constructorModeEnable, droppedItems } = useSelector(
    (state: RootState) => state.constructorReducer
  );
  const ref = useRef<T>(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'components',
    item: { component: item, idx: index },
    canDrag: constructorModeEnable && canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, fromTop }, drop] = useDrop({
    accept: 'components',
    canDrop: () => desk === 'constructor',
    drop: (item: DragItem) => {
      const { component } = item;

      if (component.name === CalcBlocksNames.DISPLAY) {
        dispatch(setDroppedItems([component, ...droppedItems]));
        return;
      }
      if (droppedItems[0].name === CalcBlocksNames.DISPLAY && index === 0) {
        return;
      }
      const restItems = droppedItems.filter((item) => item.id !== component.id);
      restItems.splice(index, 0, component);
      dispatch(setDroppedItems(restItems));
    },
    collect: (monitor) => ({
      isOver:
        !!monitor.isOver() &&
        desk === 'constructor' &&
        monitor.getItem()?.component.name !== CalcBlocksNames.DISPLAY &&
        item.name !== CalcBlocksNames.DISPLAY,
      fromTop: monitor.getItem()?.idx < index,
    }),
  });

  drag(drop(ref));

  return { ref, isOver, fromTop, isDragging };
};

export default useItemDnD;
