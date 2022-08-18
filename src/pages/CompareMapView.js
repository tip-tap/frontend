import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Map from "../components/Map";
import styles from "../styles/pages/compareMapView.module.scss";
import Toggle from "../components/common/Toggle";

import { Helmet } from "react-helmet-async";

const CompareMapView = () => {
    

    return (
        <>
            <Helmet>
                <title>이집저집 | 체크리스트</title>
            </Helmet>
            <Layout active="check">
                <div className={styles.toggle}>
                    <Toggle active="map" mapLink="/compare_map" listLink="/compare_list" />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.title}>주변시설</div>
                    
                    <div className={styles.map}>
                        <Map type="compare" />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default CompareMapView;