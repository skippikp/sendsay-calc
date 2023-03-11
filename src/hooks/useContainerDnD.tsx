import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setDroppedItems } from '../store/ConstructorSlice';
import { CalcBlocksNames, DragItem } from '../types';

export const useContainerDnD = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { droppedItems } = state.constructorReducer;

  const [{ isOver, droppedItem }, drop] = useDrop({
    accept: 'components',
    drop: (item: DragItem, monitor) => {
      const { component } = item;

      if (monitor.didDrop()) {
        return;
      }

      if (component.name === CalcBlocksNames.DISPLAY) {
        dispatch(setDroppedItems([component, ...droppedItems]));
        return;
      }

      if (!droppedItems.includes(component)) {
        dispatch(setDroppedItems([...droppedItems, component]));
      } else {
        const restItems = droppedItems.filter((i) => i.id !== component.id);
        dispatch(setDroppedItems([...restItems, component]));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: monitor.getItem()?.component.name !== CalcBlocksNames.DISPLAY,
      }),
      droppedItem: monitor.getItem()?.component,
    }),
  });

  return { ref: drop, isOver, droppedItem };
};

export default useContainerDnD;
