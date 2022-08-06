import React, {useEffect} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";

const SortableItem = sortableElement(({value}) => <li className={styles.item}>{value}</li>);
const SortableContainer = sortableContainer(({children}) => {
  return <ul className={styles.container}>{children}</ul>;
});


const Sortable = ({isChecked, whichChecked}) => {
  let items = [<Checklist isChecked={isChecked} whichChecked={whichChecked}/>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>,<Checklist isChecked={isChecked} whichChecked={whichChecked}></Checklist>];
  let onSortEnd = ({oldIndex, newIndex}) => {
    arrayMoveImmutable (items, oldIndex, newIndex);
  };
  useEffect(()=>{

    onSortEnd = ({oldIndex, newIndex}) => {
      arrayMoveImmutable (items, oldIndex, newIndex);
    };

  },items)


  return (
    <SortableContainer onSortEnd={onSortEnd} axis="x" lockAxis="x"> 
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value}/>
      ))}
    </SortableContainer>
  );

}


export default Sortable;


