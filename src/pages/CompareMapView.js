import React from "react";
import Layout from "../components/common/Layout";
import Map from "../components/Map";
import styles from "../styles/pages/compareMapView.module.scss";
import Toggle from "../components/common/Toggle";
import SEO from '../components/common/SEO';

const CompareMapView = () => {
    

    return (
        <>
            <SEO
                pageTitle="이집저집 | 체크리스트"
                pageSEO={{desc: "지도를 통해 방문 매물의 주변시설을 비교해보세요 📝", url: "/compare_map"}}
            />
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