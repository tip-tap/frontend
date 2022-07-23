import React from "react";
import { ReactComponent as Plus } from "../assets/plus.svg";
import styles from "../styles/components/createListBtn.module.scss";

const CreateListBtn = ({ pos }) => {
    return (
        <div className={`${styles.btn} ${pos === "main" && styles.main}`}>
            <Plus />
            체크리스트 생성하기
        </div>
    );
}

export default CreateListBtn;