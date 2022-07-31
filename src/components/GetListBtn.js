import React from "react";
import { ReactComponent as PlusBlue } from "../assets/plusBlue.svg";
import styles from "../styles/components/getListBtn.module.scss";

const GetListBtn = () => {
    return (
        <div className={styles.btn}>
            <PlusBlue />
            작성된 체크리스트 불러오기
        </div>
    );
}

export default GetListBtn;