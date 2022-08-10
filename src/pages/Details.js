import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/common/Layout";
import Slider from "react-slick";
// import GetListBtn from "../components/GetListBtn";
import CreateListBtn from "../components/CreateListBtn";
import Map from "../components/Map";
import styles from "../styles/pages/details.module.scss";
import img1 from "../dummy/1.jpg";
import img2 from "../dummy/2.jpg";
import img3 from "../dummy/3.jpg";
import img4 from "../dummy/4.jpg";
import img5 from "../dummy/5.jpg";
import img6 from "../dummy/6.jpg";
import img7 from "../dummy/7.jpg";


const imgArr = [img1, img2, img3, img4, img5, img6, img7];
const headers = ["기본정보", "옵션", "주변시설"];
const basics = {
    "매물 위치": "서울특별시 성동구 사근동 9가길 6",
    "공인중개사": "인공인중개사",
    "입주가능일": "즉시 입주 가능",
    "연락처": "010-6855-1999",
    "계약 형태": "반전세",
    "보증금": "8,900만원",
    "월세": "10만원",
    "관리비": "5만원",
    "해당층": "3층",
    "평 수": "5평",
    "방 수": "1개",
    "내부 구조": "베란다분리형"
};
const options = {
    "가스레인지": 0, "인덕션": 1, "전자레인지": 1, "냉장고": 1,
    "세탁기": 1, "에어컨": 1, "인터넷": 1, "TV": 1,
    "와이파이": 1, "옷장": 1, "수납장": 1, "신발장": 1,
    "침대": 1, "책상": 1, "의자": 1, "건조대": 1
};

const Details = () => {
    const [isActive, setIsActive] = useState(0);
    const [isFixed, setIsFixed] = useState(false);

    const basicsRef = useRef();
    const optionsRef = useRef();
    const facilitiesRef = useRef();
    
    const handleMiniHeader = (i) => {
        setIsActive(i);

        if (i === 0) {
            basicsRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        } else if (i === 1) {
            optionsRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
        } else {
            facilitiesRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }

    const handleScroll = () => {
        console.log(window.scrollY);

        if (window.scrollY > 680) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    return (
        <Layout withToggle={true} active={"none"}>
            <div className={styles.wrapper}>
                <section className={styles.slider}>
                    <Slider
                        infinite={true}
                        swipeToSlide={true}
                        slidesToShow={5}
                        centerMode={true}
                    >
                        {imgArr.map((v, i) =>
                            <div key={i}>
                                <img className={styles.slide} src={v} alt="dummy data" />
                            </div>
                        )}
                    </Slider>
                </section>
                <section className={styles.btn}>
                    <CreateListBtn type="primary-xl-white-bg" />
                </section>
                <section className={styles.info}>
                    <article className={`${styles.header} ${isFixed && styles.fixedHeader}`}>
                        {headers.map((value, i) => 
                            <span key={i} className={isActive === i && styles.active} onClick={() => handleMiniHeader(i)}>{value}</span>
                        )}
                    </article>
                    <article className={styles.body}>
                        <section className={styles.basics} ref={basicsRef}>
                            <article className={styles.title}>기본 정보</article>
                            <article className={styles.basicsGrid}>
                                {Object.keys(basics).map((key, index) => (
                                    <div className={styles.basicsItem}>
                                        <div key={index} className={styles.itemTitle}>
                                            {key}
                                        </div>
                                        <div className={styles.itemContent}>
                                            {basics[key]}
                                        </div>
                                        {key === "공인중개사" &&
                                        <div className={styles.manner}>
                                            <span>매너온도</span>
                                            <span className={styles.number}>40℃</span>
                                        </div>
                                        }
                                    </div>
                                ))}
                            </article>
                        </section>
                        <section className={styles.options} ref={optionsRef}>
                            <article className={styles.title}>옵션</article>
                            <article className={styles.optionsGrid}>
                                {Object.keys(options).map((key, index) => (
                                    <div key={index} className={`${styles.optionsItem} ${options[key] ? styles.positive : styles.negative}`}>
                                        {key}
                                    </div>
                                ))}
                            </article>
                        </section>
                        <section className={styles.facilities} ref={facilitiesRef}>
                            <article className={styles.title}>주변 시설</article>
                        </section>
                        <section className={styles.facilitiesMap}>
                            <Map />
                        </section>
                    </article>
                </section>
            </div>
        </Layout>
    );
}

export default Details;