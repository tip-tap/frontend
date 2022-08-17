import React, { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import styles from "../styles/pages/mapView.module.scss";
import Toggle from "../components/common/Toggle";
import { Helmet } from "react-helmet-async";

const MapView = ({ type }) => {
    const [searchToggle, setSearchToggle] = useState(true);

    return (
        <>
            <Helmet>
                <title>{`이집저집 | ${type === "wish" ? "관심 매물" : "매물 검색"}`}</title>
            </Helmet>
            <Layout active={type === "wish" ? "wish" : ""}>
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