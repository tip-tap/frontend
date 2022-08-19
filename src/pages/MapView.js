import React, { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import styles from "../styles/pages/mapView.module.scss";
import Toggle from "../components/common/Toggle";
import SEO from '../components/common/SEO';

const MapView = ({ type }) => {
    const [searchToggle, setSearchToggle] = useState(true);

    return (
        <>
            <SEO
                pageTitle={`이집저집 | ${type === "wish" ? "관심 매물" : "매물 검색"}`}
                pageSEO={
                    type === "wish" ?
                    {desc: "원하는 조건에 맞게 공인중개사가 등록해놓은 매물을 검색해보세요 🔍", url: "/map"}
                    : {desc: "관심 매물만 모아서 따로 확인해보세요 💙", url: "/wishlist"}
                }
            />
            <Layout active={type === "wish" ? "wish" : (type === "normal" ? "search" : "none")}>
                <div className={`${styles.wrapper} ${type === "wish" ? styles.extraPad : null}`}>
                    {type === "wish" ? 
                    null
                    :
                    <section className={styles.searchDiv}>
                        <SearchBox type="long" withFilter={true} searchToggle={searchToggle} setSearchToggle={setSearchToggle} />
                    </section>
                    }
                    <Toggle active="map" mapLink={type === "wish" ? "/wishmap" : "/map"} listLink={type === "wish" ? "/wishlist" : "/list"} />
                    <section className={styles.mapDiv}>
                        <Map type={type} searchToggle={searchToggle} markerFilter={Array(8).fill(0)} />
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default MapView;