import React from "react";
import styles from "../../styles/components/common/header.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Checklist } from "../../assets/checklist.svg";
import { ReactComponent as Mypage } from "../../assets/mypage.svg";

const Header = ({ withToggle, active }) => {
    return (
        <div className={styles.wrapper}>
            <section>
                <Logo />
            </section>
            {withToggle &&
            <section className={styles.middle}>
                <article className={active === "map" ? styles.active : styles.inactive}>
                    <Map fill={active === "map" ? "#0040BD" : "#CACACA"}/>
                    <span>지도로 매물보기</span>
                </article>
                <article className={active === "list" ? styles.active : styles.inactive}>
                    <List fill={active === "list" ? "#0040BD" : "#CACACA"} />
                    <span>리스트로 매물보기</span>
                </article>
            </section>
            }
            <section className={styles.right}>
                <article>
                    <Heart />
                    <span>관심 매물</span>
                </article>
                <article>
                    <Checklist />
                    <span>체크리스트</span>
                </article>
                <article>
                    <Checklist />
                    <span>확정 매물</span>
                </article>
                <article>
                    <Mypage />
                    <span>마이페이지</span>
                </article>
            </section>
        </div>
    )
}

export default Header;