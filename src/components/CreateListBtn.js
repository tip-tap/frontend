import React from "react";
import { ReactComponent as Checklist } from "../assets/checklist.svg";
import styles from "../styles/components/createListBtn.module.scss";

const CreateListBtn = ({ type }) => {
    return (
        <div className={`
            ${styles.btn}
            ${type === "primary-xl" && styles.primaryXl}
            ${type === "primary-l" && styles.primaryL}
            ${type === "secondary-m" && styles.secondaryM}
            ${type === "default-xl" && styles.defaultXl}
        `}>
            {type === "primary-xl" && <Checklist fill="#fff" />}
            <span>체크리스트 생성하기</span>
        </div>
    );
}

export default CreateListBtn;