import React from "react";
import styles from "../../styles/components/common/header.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Map } from "../../assets/map.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Checklist } from "../../assets/checklist.svg";
import { ReactComponent as Mypage } from "../../assets/mypage.svg";

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <section>
                <Logo />
            </section>
            <section className={styles.middle}>
                <article>
                    <Map />
                    <span>지도로 매물보기</span>
                </article>
                <article>
                    <List />
                    <span>리스트로 매물보기</span>
                </article>
            </section>
            <section className={styles.right}>
                <article>
                    <Heart />
                    <span>관심매물</span>
                </article>
                <article>
                    <Checklist />
                    <span>체크리스트</span>
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