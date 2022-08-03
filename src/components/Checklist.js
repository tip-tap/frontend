import React, { useState, useRef, useEffect } from "react";
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

const Checklist = () => {
    return(
        <div className={styles.checklistwrapper}>
            <div className = {styles.delete}><Delete></Delete></div>
            <div className = {styles.itemwrapper}>
                <div className={styles.imagewrapper}>
                    <img className={styles.image} src = {RoomImage} alt = 'listimg'/>
                </div>
                <div className={styles.contentwrapper}>
                    {Object.keys(checkbasics).map((key, index) => (
                        <div className={styles.itemContent}>
                            {checkbasics[key]}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
export default Checklist;