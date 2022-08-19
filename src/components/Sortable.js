import React, {useEffect, useState, useCallback} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";
import Api from "../_axios/Api";

const Sortable = ({ isChecked, whichChecked, toggle, setToggle, setIsDelete, nolist, setNolist }) => {
  const [items, setItems] = useState([]);

  const getAllChecklist = useCallback(async () => {
    await Api.get("/api/v1/checklist/")
    .then((res) => {
        if (res.data.checklists.length === 0) {
          setNolist(true);
        }
        else {
          setNolist(false);
        }
        const checkInfo = [];
        res.data.checklists.forEach((checklists, index)=>{
          checkInfo[index] = checklists;
        });
        setItems(checkInfo.map((value)=>{
          return(<Checklist key = {value.checklist_id} isChecked={isChecked} whichChecked={whichChecked} value = {value.roomInfo} checklist_id = {value.checklist_id} toggle={toggle} setToggle={setToggle} setIsDelete={setIsDelete} img = {value.images} />)
        }));


    })
    .catch((err) => console.log(err))
})

  const SortableItem = sortableElement(({value}) => <li className={styles.item}>{value}</li>);  
  const SortableContainer = sortableContainer(({children}) => {
    return <ul className={styles.container}>{children}</ul>; 
  });
  const onSortStart = () =>{
    document.body.style.cursor = 'col-resize';
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMoveImmutable (items, oldIndex, newIndex));
    document.body.style.cursor = 'default';
  };


  useEffect(() => {
    getAllChecklist(); // api test
  }, [isChecked, whichChecked, toggle]);

  return (
    <SortableContainer onSortStart = {onSortStart} onSortEnd={onSortEnd} axis="x" lockAxis="x" pressDelay={100} > 
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </SortableContainer>
  );
}

export default Sortable;