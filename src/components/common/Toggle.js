import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import styles from "../../styles/components/common/toggle.module.scss";

const Toggle = ({ active, mapLink, listLink }) => {
    return (
        <section className={styles.wrapper}>
            <Link to={mapLink}>
                <article className={`${styles.item} ${active === "map" ? styles.active : styles.inactive}`}>
                    <Map fill={active === "map" ? "#0040BD" : "#CACACA"}/>
                    <span className={styles.text}>지도로 보기</span>
                </article>
            </Link>
            <Link to ={listLink}>
                <article className={`${styles.item} ${active === "list" ? styles.active : styles.inactive}`}>
                    <List fill={active === "list" ? "#0040BD" : "#CACACA"} />
                    <span className={styles.text}>리스트로 보기</span>
                </article>
            </Link>
        </section>
    );
}

export default Toggle;