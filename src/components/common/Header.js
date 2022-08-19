import React from "react";
import Api from "../../_axios/Api";
import { Link } from "react-router-dom";
import styles from "../../styles/components/common/header.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as List } from "../../assets/list.svg";

const Header = ({ active }) => {
    console.log(active);
    return (
        <div className={styles.wrapper}>
            <section className={styles.left}>
                <Link to="/">
                    <Logo />
                </Link>
            </section>
            <section>
            </section>
            <section className={styles.right}>
                <Link to ="/map">
                    <span className={active === "search" ? styles.active : styles.inactive}>매물 검색</span>
                </Link>
                <Link to="/wishlist">
                    <span className={active === "wish" ? styles.active : styles.inactive}>관심 매물</span>
                </Link>
                <Link to="/compare_list">
                    <span className={active === "check" ? styles.active : styles.inactive}>체크리스트</span>
                </Link>
                <span className={styles.inactive}>확정 매물</span>
                <span className={styles.inactive}>로그아웃</span>
            </section>
        </div>
    )
}

export default Header;