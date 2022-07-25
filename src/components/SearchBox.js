import React, { useState } from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import styles from "../styles/components/searchBox.module.scss";

const SearchBox = ({ type }) => {
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className={`
                ${styles.box}
                ${type === "short" && styles.shortBox}
                ${type === "long" && styles.longBox}
            `}>
                <Search />
                <input placeholder="지역을 입력해주세요"/>
            </div>
            {showList && 
                <div className={`
                    ${styles.list}
                    ${type === "short" && styles.shortList}
                    ${type === "long" && styles.longList}
                `}>
                </div>
            }
        </>
    );
}

export default SearchBox;