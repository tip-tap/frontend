import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/components/map.module.scss";
import { Markers } from "../icons/Markers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState, searchInputState } from "../_recoil/state";
import { categoryCode } from "../attributes/categories";
import heart from "../assets/heart.svg";
import axios from "axios";
import { useSnackbar } from "notistack";

const { kakao } = window;
let map;

const Map = ({ markerFilter = Array(8).fill(1), type, searchToggle }) => {
    // notistack snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // recoil 상태 관리
    const [{ centerLat, centerLng }, setCenterPos] = useRecoilState(centerPosState);
    const [{ lowerLeftLat, lowerLeftLng }, setLowerLeftPos] = useRecoilState(lowerLeftPosState);
    const [{ upperRightLat, upperRightLng }, setUpperRightPos] = useRecoilState(upperRightPosState);
    const setSearchInput = useSetRecoilState(searchInputState);

    // 지도 레벨
    const [mapLevel, setMapLevel] = useState(3);

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

    // 매물 위치 불러오기
    const getOneRoom = useCallback(() => {
        let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(centerLat, centerLng)
        });
        marker.setMap(map);
    }, [centerLat, centerLng]);

    // 매물 조회 GET
    const getRooms = useCallback(async () => {
        console.log("getRooms");
        await axios.get(`http://localhost:8000/api/v1/rooms/?location=[[${lowerLeftLat},${lowerLeftLng}],[${centerLat},${centerLng}],[${upperRightLat},${upperRightLng}]]`)
        .then((res) => {
            let clusterer = new kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 3,
                minClusterSize: 1
            });

            res.data.rooms.forEach((room) => {
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(room.roomInfo.basicInfo_location_x, room.roomInfo.basicInfo_location_y)
                });
                clusterer.addMarker(marker);
            })
        })
        .catch((err) => console.log(err))
    }, [lowerLeftLat, lowerLeftLng, centerLat, centerLng, upperRightLat, upperRightLng]);

    // 관심매물 조회 GET
    const getInterests = async () => {
        await axios.get("http://localhost:8000/api/v1/interest/")
        .then((res) => {
            let clusterer = new kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 5,
                minClusterSize: 1
            });

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
                clusterer.addMarker(marker);
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
                let clusterer = new kakao.maps.MarkerClusterer({
                    map: map,
                    averageCenter: true,
                    minLevel: 5,
                    minClusterSize: 1
                });

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
                    clusterer.addMarker(marker);
                });
                map.setBounds(bounds);
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
        else if (type === "details") {
            getOneRoom();
            getFacilities();
        }
    }, [type, getRooms, getChecklists, getOneRoom, getFacilities]);
    
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
            level: mapLevel,
        };
        map = new kakao.maps.Map(mapContainer, mapOption);

        // 지도 확대/축소 레벨 제한
        if (type === "details") { map.setMaxLevel(5); }
        

        // 지도 타입에 맞게 정보 업데이트
        getInfos();

        // 전체 매물 검색 지도일 경우 줌/드래그 이벤트 설정
        if (type === "normal") {
            // geocoder
            let geocoder = new kakao.maps.services.Geocoder();

            // 줌(확대/축소) 이벤트 등록
            kakao.maps.event.addListener(map, 'zoom_changed', function() {        			
                let currentLevel = map.getLevel();
                setMapLevel(currentLevel);
                console.log("변경된 지도 확대/축소 레벨 " + currentLevel);
                console.log("변경된 지도 범위", map.getBounds());
                
                if (currentLevel >= 10) {
                    enqueueSnackbar("보고 있는 지역이 너무 넓습니다 지도를 확대해주세요", {
                        variant: "info",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                        },
                        sx: {
                            "& .SnackbarContent-root": {
                                bgcolor: "#0040BD"
                            }
                        }
                    });
                }
                else {
                    closeSnackbar();
                    setCenterPos({
                        centerLat: map.getCenter().getLat(),
                        centerLng: map.getCenter().getLng(),
                    });
                    updateBounds();
                    getRooms();
                }
            });

            // 드래그(이동) 이벤트 등록
            kakao.maps.event.addListener(map, "dragend", function() {
                let latlng = map.getCenter();
                let currentBounds = map.getBounds();
                console.log("이전 지도 중심좌표 ", centerLat, centerLng);
                console.log("변경된 지도 중심좌표 " + latlng );
                console.log("변경된 영역 ", currentBounds);

                geocoder.coord2Address(map.getCenter().getLng(), map.getCenter().getLat(), (result, status) => { 
                    if (status === kakao.maps.services.Status.OK) {
                        setSearchInput(result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name);
                    }
                });
                

                if (centerLat > currentBounds.getNorthEast().getLat() || centerLat < currentBounds.getSouthWest().getLat()
                || centerLng > currentBounds.getNorthEast().getLng() || centerLng < currentBounds.getSouthWest().getLng()) {
                    setCenterPos({
                        centerLat: map.getCenter().getLat(),
                        centerLng: map.getCenter().getLng(),
                    });
                    updateBounds();
                    getRooms();
                }
            });
        }
    }, [type, centerLat, centerLng, mapLevel, updateBounds, getInfos, getRooms, setSearchInput, setCenterPos, enqueueSnackbar, closeSnackbar]);

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