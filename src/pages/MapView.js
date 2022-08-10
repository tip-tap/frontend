import React from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import styles from "../styles/pages/mapView.module.scss";

const MapView = () => {
    return (
        <Layout withToggle={true} active={"map"}>
            <div className={styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} />
                </section>
                <section className={styles.mapDiv}>
                    <Map />
                </section>
            </div>
        </Layout>
    );
}

export default MapView;