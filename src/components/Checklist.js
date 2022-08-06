import React, { useState } from "react";
import styles from "../styles/components/checklist.module.scss";
import RoomImage from "../dummy/room.png";
import { ReactComponent as Delete } from "../assets/delete.svg";

const checkbasics = {
    "매물 위치": "서울특별시 성동구 사근동 9가길 6",
    "입주가능일": "즉시 입주 가능",
    "계약 형태": "반전세",
    "보증금": "8,900만원",
    "월세": "10만원",
    "관리비": "5만원",
    "해당층": "3층",
    "평 수": "6평",
    "방 수": "1개",
    "내부 구조": "베란다분리형"
}

const checkoptions = {
    "가스레인지":"없음","인덕션":"있음",
    "전자레인지":"있음","냉장고":"있음",
    "세탁기":"있음","에어컨":"있음",
    "인터넷":"있음","TV":"없음",
    "와이파이":"있음","옷장":"있음",
    "수납장":"있음","신발장":"있음",
    "침대":"있음","책상":"있음","의자":"있음"
}
const checkdetails = {
    "곰팡이":"없음","누수":"없음",
    "벌레":"있음","균열":"없음",
    "방음":"상","창문 크기":"보통이다",
    "주실 방향":"남향","환풍기":"빠르다",
    "통풍":"상","외부 소음":"크다",
    "수압":"약하다","배수":"보통이다","온수":"세다"
}



const Checklist = ({isChecked, whichChecked}) => {

    const[isDelete,setIsDelete] = useState(0);
    
    const handleDelete = () =>{
        console.log("되는거니");
        alert("되는거니");
    };

    return(
        <div className={styles.checklistwrapper}>
            <div className = {styles.delete}><Delete onClick ={handleDelete}></Delete></div>

            <div className={styles.wangbasics}>
                <div className = {styles.basicswrap}>
                    <div className={styles.imagewrapper}>
                        <img className={styles.image} src = {RoomImage} alt = 'listimg'/>
                    </div>
                    <div className={styles.basicsContentWrap}>
                        {Object.keys(checkbasics).map((key, index) => (
                            <div className={styles.basicsContent}>
                                {checkbasics[key]}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>

            <div className={isChecked[1] && whichChecked[1] ?styles.wangoptions :styles.none}>
                <div className = {styles.optionswrap}>
                    <div className={styles.optionsContentWrap}>
                        {Object.keys(checkoptions).map((key, index) => (
                            <div className={styles.optionsContent}>
                                {checkoptions[key]}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>
            
                
            <div className = {isChecked[2] && whichChecked[2] ?styles.wangdetails :styles.none}>
                <div className={styles.detailswrap}>
                    <div className={styles.detailsContentWrap}>
                        {Object.keys(checkdetails).map((key, index) => (
                            <div className={styles.detailsContent}>
                                {checkdetails[key]}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>
        
        </div>
    );
}
export default Checklist;