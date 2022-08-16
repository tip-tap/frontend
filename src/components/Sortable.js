import React, {useEffect, useState, useCallback} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";
import axios from "axios";
import { basicsKR, basicsEN } from "../attributes/basics";
import { optionsKR, optionsEN } from "../attributes/options";
import { basicsBEtoFE } from "../attributes/converter";

const Sortable = ({ isChecked, whichChecked }) => {
  const [items, setItems] = useState([]);

  const [basics, setBasics] = useState({});
  const [options, setOptions] = useState({});
  const [details, setDetails] = useState({});
  const [check, setCheck] = useState([]);

  const getAllChecklist = useCallback(async () => {
    await axios.get("http://localhost:8000/api/v1/checklist/")
    .then((res) => {
        console.log(res);
        const checkInfo = res.data.checklists[0].roomInfo;
        console.log(checkInfo);

        /*
        // 기본정보
        const basicsInfo = {};
        basicsInfo[basicsKR[0]] = checkInfo.basicInfo_address;
        for (let i=1; i<12; i++) {
              basicsInfo[basicsKR[i]] = checkInfo[basicsEN[i+1]];
        }
        setBasics(basicsInfo);
        console.log(basicsInfo);

         // 옵션
         const optionsInfo = {};
         optionsKR.forEach((option, index) => {
             optionsInfo[option] = roomInfo[optionsEN[index]];
         });
         setOptions(optionsInfo);
        */




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