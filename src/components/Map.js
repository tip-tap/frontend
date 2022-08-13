import React, { useEffect, useCallback } from "react";
import styles from "../styles/components/map.module.scss";
import { Markers } from "./icons/Markers";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState } from "../_recoil/state";

const { kakao } = window;
let map;

const categoryCode = {
    "SW8": "지하철",
    "MT1": "대형마트",
    "CS2": "편의점",
    "FD6": "음식점",
    "CE7": "카페",
    "HP8": "병원",
    "PM9": "약국",
    "AG2": "중개업소"
};

const Map = ({ markerFilter = Array(8).fill(1), type }) => {
    // recoil 상태 관리
    const {centerLat, centerLng} = useRecoilValue(centerPosState);
    const setLowerLeftPos = useSetRecoilState(lowerLeftPosState);
    const setUpperRightPos = useSetRecoilState(upperRightPosState);
    
    // 지도 범위 좌표 업데이트
    const updatePos = useCallback(() => {
        // qa: 왼쪽 아래 위도, ha: 왼쪽 아래 경도, pa: 오른쪽 위 위도, oa: 오른쪽 위 경도
        const bounds = map.getBounds();

        setLowerLeftPos({
            lowerLeftLat: bounds.qa,
            lowerLeftLng: bounds.ha,
        });
        setUpperRightPos({
            upperRightLat: bounds.pa,
            upperRightLng: bounds.oa,
        });

        console.log(bounds, map.getCenter());
    }, [setLowerLeftPos, setUpperRightPos]);

    // navigator.geolocation callback
    const onValid = useCallback((pos) => {
        map.setCenter(new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

        if (centerLat !== -1 && centerLng !== -1) {
            map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
            updatePos();
        }
    }, [centerLat, centerLng, updatePos]);

    const onInvalid = useCallback(() => {
        console.log("위치 액세스 차단 상태");

        if (centerLat !== -1 && centerLng !== -1) {
            map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
            updatePos();
        }
    }, [centerLat, centerLng, updatePos]);

    // 지도에 마커 및 인포윈도우 표시
    const displayMarker = (position, category, place) => {
        // 마커 생성
        let markerImage = new kakao.maps.MarkerImage(Markers[categoryCode[category]], new kakao.maps.Size(36, 36));
        let marker = new kakao.maps.Marker({
            position: position,
            image: markerImage
        });
        marker.setMap(map);

        // 인포윈도우 생성
        let iwContent = `
        <div style="display:flex; flex-direction:column; width: 200px; padding: 5px 5px 7px 5px; font-family: 'Noto Sans KR', sans-serif;">
            <div style="font-size: 14px; font-weight: 600; color: #0040BD; margin-bottom: 5px;">${place.place_name}</div>
            <div style="font-size: 11px;">
                <div style="font-weight: 300; color: #B7B7B7; margin-bottom: 5px;">${place.category_name}</div>
                <div style="font-weight: 400;">${place.road_address_name}</div>
            </div>
        </div>
        `

        let infoWindow = new kakao.maps.InfoWindow({
            content: iwContent,
        });

        kakao.maps.event.addListener(marker, "mouseover", function() {
            infoWindow.open(map, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", function() {
            infoWindow.close();
        });
    }

    // 주변 시설 불러오기
    const getFacilities = useCallback(() => {

        let places = new kakao.maps.services.Places();
        let callback = function(status, result, pagination) {
            // console.log(status, result);
            for (let i=0; i<10; i++) {
                displayMarker(new kakao.maps.LatLng(status[i].y, status[i].x), status[0].category_group_code, status[i]);
            }
        };

        Object.keys(categoryCode).forEach((code, idx) => {
            if (markerFilter[idx]) {
                places.categorySearch(code, callback, {
                    location: new kakao.maps.LatLng(centerLat, centerLng)
                });
            }
        });
    }, [centerLat, centerLng, markerFilter]);

    useEffect(() => {
        // 지도 생성
        let mapContainer = document.getElementById("map");
        let mapOption = {
            center: new kakao.maps.LatLng(37.566783658885626, 126.97865792991867),
            level: 3,
        };
        map = new kakao.maps.Map(mapContainer, mapOption);

        if (type === "compare" || type === "details") { map.setMaxLevel(5); }
        else { map.setMaxLevel(10); }
        
        // 위치 액세스 가능할 시 사용자의 현 위치로 지도 중심 변경
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(onValid, onInvalid); }
        else { console.log("geolocation 사용 불가"); }

        if (type === "compare" || type === "details") { getFacilities(); }
    }, [onValid, onInvalid, getFacilities, type]);

    return (
        <>  
            <div id="map" className={styles.map}></div>
        </>
    );
}

export default Map;