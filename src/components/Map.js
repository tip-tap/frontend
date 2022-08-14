import React, { useEffect, useCallback } from "react";
import styles from "../styles/components/map.module.scss";
import { Markers } from "../icons/Markers";
import { useRecoilState } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState } from "../_recoil/state";
import { categoryCode } from "../attributes/categories";
import heart from "../assets/heart.svg";
import axios from "axios";

const { kakao } = window;
let map;

const Map = ({ markerFilter = Array(8).fill(1), type, searchToggle }) => {
    // recoil 상태 관리
    const [{ centerLat, centerLng }, setCenterPos] = useRecoilState(centerPosState);
    const [{ lowerLeftLat, lowerLeftLng }, setLowerLeftPos] = useRecoilState(lowerLeftPosState);
    const [{ upperRightLat, upperRightLng }, setUpperRightPos] = useRecoilState(upperRightPosState);

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

        for (let i=0; i<9; i++) {
            if (i === 7) { continue; }
            if (markerFilter[i]) {
                places.categorySearch(Object.keys(categoryCode)[i], callback, {
                    location: new kakao.maps.LatLng(centerLat, centerLng)
                });
            }
        }
    }, [centerLat, centerLng, markerFilter]);

    // 매물 조회 GET
    const getRooms = useCallback(async () => {
        console.log("getRooms");
        await axios.get(`http://localhost:8000/api/v1/rooms/?location=[[${lowerLeftLat},${lowerLeftLng}],[${centerLat},${centerLng}],[${upperRightLat},${upperRightLng}]]`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }, [lowerLeftLat, lowerLeftLng, centerLat, centerLng, upperRightLat, upperRightLng]);

    // 관심매물 조회 GET
    const getInterests = async () => {
        console.log("getInterests");
        await axios.get("http://localhost:8000/api/v1/interest/")
        .then((res) => {
            console.log(res);

            let bounds = new kakao.maps.LatLngBounds();
            res.data.forEach((interest) => {
                let markerImage = new kakao.maps.MarkerImage(heart, new kakao.maps.Size(36, 36));
                let position = new kakao.maps.LatLng(interest.roomInfo.basicInfo_location_x, interest.roomInfo.basicInfo_location_y); 
                let marker = new kakao.maps.Marker({
                    position,
                    image: markerImage
                });
                marker.setMap(map);
                bounds.extend(position);
            });
            map.setBounds(bounds);
        })
        .catch((err) => console.log(err))
    }

    // 체크리스트 조회 GET
    const getChecklists = useCallback(async () => {
        if (markerFilter[7]) {
            console.log("getChecklists");
            await axios.get("http://localhost:8000/api/v1/checklist/")
            .then((res) => {
                console.log(res);

                let bounds = new kakao.maps.LatLngBounds();
                res.data.checklists.forEach((checklist) => {
                    let markerImage = new kakao.maps.MarkerImage(Markers["방문매물"], new kakao.maps.Size(36, 36));
                    let position = new kakao.maps.LatLng(checklist.roomInfo.basicInfo_location_x, checklist.roomInfo.basicInfo_location_y); 
                    let marker = new kakao.maps.Marker({
                        position,
                        image: markerImage
                    });
                    marker.setMap(map);
                    bounds.extend(position);
                    
                });
            })
            .catch((err) => console.log(err))
        }
    }, [markerFilter]);

    // getInfos (according to map type)
    const getInfos = useCallback(() => {
        if (type === "normal") {
            getRooms();
        }
        else if (type === "wish") {
            getInterests();
        }
        else if (type === "compare") {
            getChecklists();
            getFacilities();
        }
    }, [type, getRooms, getFacilities]);
    
    // 지도 범위 좌표 업데이트
    const updateBounds = useCallback(() => {
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

    // navigator.geolocation onValid callback
    const onValid = useCallback((pos) => {
        setCenterPos({
            centerLat: pos.coords.latitude,
            centerLng: pos.coords.longitude,
        });
        updateBounds();
    }, [setCenterPos, updateBounds]);

    // navigator.getolocation onInvalid callback
    const onInvalid = useCallback(() => {
        console.log("위치 액세스 차단 상태");
    }, []);

    useEffect(() => {
        // 현재 위치 정보 가져오기
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(onValid, onInvalid); }
        else { console.log("geolocation 사용 불가"); }
    }, [onValid, onInvalid]);

    useEffect(() => {
        // 지도 생성
        let mapContainer = document.getElementById("map");
        let mapOption = {
            center: new kakao.maps.LatLng(centerLat, centerLng),
            level: 3,
        };
        map = new kakao.maps.Map(mapContainer, mapOption);

        // 지도 확대/축소 레벨 제한
        if (type === "compare" || type === "details") { map.setMaxLevel(5); }
        else { map.setMaxLevel(10); }

        // 지도 타입에 맞게 정보 업데이트
        getInfos();
    }, [centerLat, centerLng, updateBounds, getInfos, type]);

    // 검색이벤트 발생 시 지도 중심 업데이트 및 범위 상태관리
    useEffect(() => {
        map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
        updateBounds();
    }, [centerLat, centerLng, searchToggle, updateBounds])

    return (
        <>  
            <div id="map" className={styles.map}></div>
        </>
    );
}

export default Map;