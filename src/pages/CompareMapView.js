import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Map from "../components/Map";
import { MarkersOn } from "../icons/MarkersOn";
import { MarkersOff } from "../icons/MarkersOff"
import styles from "../styles/pages/compareMapView.module.scss";
import Toggle from "../components/common/Toggle";
import { labels } from "../attributes/categories";

const CompareMapView = () => {
    const [markers, setMarkers] = useState(Array(9).fill(1));
    const handleMarkers = (i) => {
        let newMarkers = [...markers];
        if (newMarkers[i]) { newMarkers[i] = 0; }
        else { newMarkers[i] = 1; }
        setMarkers(newMarkers);
    }

    return (
        <Layout active="check">
            <div className={styles.toggle}>
                <Toggle active="map" mapLink="/compare_map" listLink="/compare_list" />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.title}>주변시설</div>
                <div className={styles.markers}>
                    {markers.map((value, i) => {
                        if (value) {
                            return <div key={"markerOn" + i} onClick={() => handleMarkers(i)}>{MarkersOn[labels[i]]()}</div> 
                        } else {
                            return <div key={"markerOff" + i} onClick={() => handleMarkers(i)}>{MarkersOff[labels[i]]()}</div>
                        }
                    })}
                </div>
                <div className={styles.map}>
                    <Map markerFilter={markers} type="compare" />
                </div>
            </div>
        </Layout>
    );
}

export default CompareMapView;