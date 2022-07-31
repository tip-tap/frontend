import React, { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import styles from "../styles/pages/mapView.module.scss";

const MapView = () => {
    const [centerLat, setCenterLat] = useState(-1);
    const [centerLng, setCenterLng] = useState(-1);

    return (
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} setCenterLat={setCenterLat} setCenterLng={setCenterLng} />
                </section>
                <section className={styles.mapDiv}>
                    <Map centerLat={centerLat} centerLng={centerLng}/>
                </section>
            </div>
        </Layout>
    );
}

export default MapView;