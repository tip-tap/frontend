import React, {useEffect, useState, useCallback} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";
import Api from "../_axios/Api";
import { basicsKR, basicsEN } from "../attributes/basics";
import { optionsKR, optionsEN } from "../attributes/options";
import { basicsBEtoFE } from "../attributes/converter";

const Sortable = ({ isChecked, whichChecked, toggle, setToggle, setIsDelete }) => {
  const [items, setItems] = useState([]);

  const getAllChecklist = useCallback(async () => {
    await Api.get("/api/v1/checklist/")
    .then((res) => {
        console.log(res);
        const checkInfo = [];
        res.data.checklists.forEach((checklists, index)=>{
          checkInfo[index] = checklists;
        });
        setItems(checkInfo.map((value)=>{
          console.log(value.images);
          return(<Checklist key = {value.checklist_id} isChecked={isChecked} whichChecked={whichChecked} value = {value.roomInfo} checklist_id = {value.checklist_id} toggle={toggle} setToggle={setToggle} setIsDelete={setIsDelete} img = {value.images} />)
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
    <SortableContainer onSortEnd={onSortEnd} axis="x" lockAxis="x" distance={1}> 
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </SortableContainer>
  );
}

export default Sortable;