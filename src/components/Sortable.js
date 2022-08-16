import React, {useEffect, useState, useCallback} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";
import axios from "axios";

const Sortable = ({ isChecked, whichChecked, toggle, setToggle, setIsDelete }) => {
  const [items, setItems] = useState([]);

  const getAllChecklist = useCallback(async () => {
    await axios.get("http://localhost:8000/api/v1/checklist/")
    .then((res) => {
        console.log(res);
        const checkInfo = [];
        res.data.checklists.forEach((checklists, index)=>{
          checkInfo[index] = checklists;
        });
        setItems(checkInfo.map((value)=>{
          return(<Checklist key = {value.checklist_id} isChecked={isChecked} whichChecked={whichChecked} value = {value.roomInfo} checklist_id = {value.checklist_id} toggle={toggle} setToggle={setToggle} setIsDelete={setIsDelete}/>)
        }));


    })
    .catch((err) => console.log(err))
})

  const SortableItem = sortableElement(({value}) => <li className={styles.item}>{value}</li>); 
  const SortableContainer = sortableContainer(({children}) => {
    return <ul className={styles.container}>{children}</ul>; 
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMoveImmutable (items, oldIndex, newIndex));
  };

  useEffect(() => {
    getAllChecklist(); // api test
  }, [isChecked, whichChecked, toggle]);

  return (
    <SortableContainer onSortEnd={onSortEnd} axis="x" lockAxis="x"> 
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </SortableContainer>
  );
}

export default Sortable;