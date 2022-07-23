import React from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import styles from "../styles/components/searchBox.module.scss";

const SearchBox = ({ pos }) => {
    return (
        <div className={`${styles.box} ${pos === "main" && styles.main}`}>
            <Search />
            <input placeholder="지역을 입력해주세요"/>
        </div>
    );
}

export default SearchBox;