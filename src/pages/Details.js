import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import Slider from "react-slick";
import CreateListBtn from "../components/CreateListBtn";
import Map from "../components/Map";
import styles from "../styles/pages/details.module.scss";
import { useSetRecoilState } from "recoil";
import { centerPosState } from "../_recoil/state";
import Api from "../_axios/Api";
import { basicsKR, basicsEN } from "../attributes/basics";
import { optionsKR, optionsEN } from "../attributes/options";
import { basicsBEtoFE } from "../attributes/converter";
import SEO from '../components/common/SEO';

const headers = ["기본정보", "옵션", "주변시설"];

const { kakao } = window;

const Details = () => {
    const params = useParams();

    const [isActive, setIsActive] = useState(0);
    const [isFixed, setIsFixed] = useState(false);

    const [basics, setBasics] = useState({});
    const [options, setOptions] = useState({});
    const [manner, setManner] = useState("");
    const [images, setImages] = useState([]);

    const setCenterPos = useSetRecoilState(centerPosState);

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

    const handleScroll = useCallback(() => {
        if (images.length === 0) {
            if (window.scrollY > 220) { setIsFixed(true); }
            else { setIsFixed(false); }
        }
        else {
            if (window.scrollY > 680) { setIsFixed(true); }
            else { setIsFixed(false); }
        }
    }, [images.length]);

    const displayBasics = (key, value) => {
        if (key === "입주 가능일") {
            if (value === "문의조정가능" || value === "즉시입주가능") { return value; }
            else { return value.slice(0, 10); }
        }
        else if (key === "계약 형태" || key === "방 수" || key === "내부구조") { return value ? basicsBEtoFE[value] : "-"; }
        if (key === "보증금") { return value ? (value >= 99999999 ? Math.floor(value / 100000000) + "억 " : "") + value % 100000000 / 10000 + "만원" : "-"; }
        else if (key === "월세" || key === "관리비") { return value ? value / 10000 + "만원" : "-"; }
        else if (key === "해당층") { return value ? value + "층" : "-"; }
        else if (key === "평 수") { return value ? value + "평" : "-"; }
        else { return value ? value : "-"; }
    }

    const getOneRoom = useCallback(async (room_id) => {
        await Api.get(`/api/v1/rooms/${room_id}/`)
        .then((res) => {
            // console.log(res);
            const roomInfo = res.data.roomInfo;

            // 이미지
            const imagesInfo  = [];
            res.data.images.forEach((image) => {
                imagesInfo.push(`${process.env.REACT_APP_BASE_URL}${image}`);
            });
            if (imagesInfo.length > 0) {
                while (imagesInfo.length < 5) {
                    for (let i=0; i<res.data.images.length; i++) {
                        imagesInfo.push(imagesInfo[i]);
                    }
                }
            }
            setImages(imagesInfo);

            // 기본 정보
            const basicsInfo = {};
            basicsInfo[basicsKR[0]] = roomInfo.basicInfo_address;
            for (let i=1; i<12; i++) {
                basicsInfo[basicsKR[i]] = roomInfo[basicsEN[i+1]];
            }
            setBasics(basicsInfo);
            console.log(basicsInfo);

            // 매너온도
            setManner(res.data.brokerAgency.brokerAgency_manner);
            
            // 옵션
            const optionsInfo = {};
            optionsKR.forEach((option, index) => {
                optionsInfo[option] = roomInfo[optionsEN[index]];
            });
            setOptions(optionsInfo);

            // 주변 시설
            setCenterPos({
                centerLat: roomInfo.basicInfo_location_x,
                centerLng: roomInfo.basicInfo_location_y,
            });
        })
        .catch((err) => console.log(err))
    }, [setCenterPos]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        const room_id = params.id;
        getOneRoom(room_id);
    }, [params, handleScroll, getOneRoom])

    return (
        <>
            <SEO
                pageTitle="이집저집 | 매물 상세"
                pageSEO={{desc: "공인중개사가 제공하는 매물의 자세한 정보를 확인해보세요 💡", url: `/details/${params.id}`}}
            />
            <Layout>
                <div className={styles.wrapper}>
                    <section className={styles.slider}>
                        <Slider
                            infinite={true}
                            swipeToSlide={true}
                            slidesToShow={4}
                            centerMode={true}
                        >
                            {images.map((url, i) =>
                                <div key={`img - ${i}`}>
                                    <img className={styles.slide} src={url} alt={url.slice(url.lastIndexOf('/') + 1)} />
                                </div>
                            )}
                        </Slider>
                    </section>
                    <section className={styles.btn}>
                        <Link to={`/open_checklist/${params.id}`}>
                            <CreateListBtn type="primary-xl-white-bg" />
                        </Link>
                    </section>
                    <section className={styles.info}>
                        <article className={`${styles.header} ${isFixed && styles.fixedHeader}`}>
                            {headers.map((value, i) => 
                                <span key={`header - ${value}`} className={isActive === i && styles.active} onClick={() => handleMiniHeader(i)}>{value}</span>
                            )}
                        </article>
                        <article className={styles.body}>
                            <section className={styles.basics} ref={basicsRef}>
                                <article className={styles.title}>기본 정보</article>
                                <article className={styles.basicsGrid}>
                                    {Object.keys(basics).map((key) => (
                                        <div key={`basic - ${key}`} className={styles.basicsItem}>
                                            <div className={styles.itemTitle}>
                                                {key}
                                            </div>
                                            <div className={styles.itemContent}>
                                                {displayBasics(key, basics[key])}
                                            </div>
                                            {key === "공인중개사" &&
                                            <div className={styles.manner}>
                                                <span>매너온도</span>
                                                <span className={styles.number}>{manner}℃</span>
                                            </div>
                                            }
                                        </div>
                                    ))}
                                </article>
                            </section>
                            <section className={styles.options} ref={optionsRef}>
                                <article className={styles.title}>옵션</article>
                                <article className={styles.optionsGrid}>
                                    {Object.keys(options).map((key) => (
                                        <div key={`option - ${key}`} className={`${styles.optionsItem} ${options[key] ? styles.positive : styles.negative}`}>
                                            {key}
                                        </div>
                                    ))}
                                </article>
                            </section>
                            <section className={styles.facilities} ref={facilitiesRef}>
                                <article className={styles.title}>주변 시설</article>
                            </section>
                            <section className={styles.facilitiesMap}>
                                <Map type="details" markerFilter={Array(8).fill(1)}/>
                            </section>
                        </article>
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default Details;