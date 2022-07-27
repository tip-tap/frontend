import React, { useEffect } from "react";
import styles from "../styles/components/map.module.scss";

const { kakao } = window;
let map;

const Map = () => {
    const onValid = (pos) => {
        map.setCenter(new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    }

    const onInvalid = () => {
        console.log("위치 액세스 차단 상태");
    }

    useEffect(() => {
        // 지도 생성
        let mapContainer = document.getElementById("map");
        let mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        map = new kakao.maps.Map(mapContainer, mapOption);

        // 위치 액세스 가능할 시 사용자의 현 위치로 지도 중심 변경
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onValid, onInvalid);
        } else {
            console.log("geolocation 사용 불가");
        }
    }, []);

    return (
        <>
            <div id="map" className={styles.map}></div>
        </>
    );
}

export default Map;