import React, {useEffect, useState} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";

const Sortable = ({ isChecked, whichChecked }) => {
  const [items, setItems] = useState([]);

  const SortableItem = sortableElement(({value}) => <li className={styles.item}>{value}</li>); 
  const SortableContainer = sortableContainer(({children}) => {
    return <ul className={styles.container}>{children}</ul>; 
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMoveImmutable (items, oldIndex, newIndex));
  };

  useEffect(() => {
    setItems([<Checklist isChecked={isChecked} whichChecked={whichChecked}/>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>]);
  }, [isChecked, whichChecked]);

  return (
    <SortableContainer onSortEnd={onSortEnd} axis="x" lockAxis="x"> 
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </SortableContainer>
  );
}

export default Sortable;