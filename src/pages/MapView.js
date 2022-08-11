import React from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import styles from "../styles/pages/mapView.module.scss";
import Toggle from "../components/common/Toggle";

const MapView = ({ type }) => {
    return (
        <Layout active={type === "wish" ? "wish" : ""}>
            <div className={`${styles.wrapper} ${type === "wish" ? styles.extraPad : null}`}>
                {type === "wish" ? 
                null
                :
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} />
                </section>
                }
                <Toggle active="map" mapLink={type === "wish" ? "/wishmap" : "/map"} listLink={type === "wish" ? "/wishlist" : "/list"} />
                <section className={styles.mapDiv}>
                    <Map />
                </section>
            </div>
        </Layout>
    );
}

export default MapView;