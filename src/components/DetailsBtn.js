import React from "react";
import { ReactComponent as Details } from "../assets/detailsbtn.svg";
import styles from "../styles/components/detailsBtn.module.scss";

const DetailsBtn = ({ type }) => {
    return (
        <div className={`
            ${styles.btn}
            ${type === "primary-l" && styles.primaryL}
            ${type === "secondary-m" && styles.secondaryM}
        `}>
            <span>세부정보 확인하기</span>
        </div>
    );
}

export default DetailsBtn;