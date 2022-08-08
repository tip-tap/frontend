import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/components/common/header.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as List } from "../../assets/list.svg";

const Header = ({ withToggle, active }) => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.left}>
                <Logo />
            </section>
            {withToggle &&
            <section className={styles.middle}>
                <Link to="/map">
                    <article className={active === "map" ? styles.active : styles.inactive}>
                        <Map fill={active === "map" ? "#0040BD" : "#CACACA"}/>
                        <span>지도로 보기</span>
                    </article>
                </Link>
                <Link to ="/list">
                    <article className={active === "list" ? styles.active : styles.inactive}>
                        <List fill={active === "list" ? "#0040BD" : "#CACACA"} />
                        <span>리스트로 보기</span>
                    </article>
                </Link>
            </section>
            }
            <section className={styles.right}>
                <span>관심 매물</span>
                <span>체크리스트</span>
                <span>확정 매물</span>
                <span>마이페이지</span>
                <span>로그아웃</span>
            </section>
        </div>
    )
}

export default Header;