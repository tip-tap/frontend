import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/map.module.scss";
import { Markers } from "../icons/Markers";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState, searchInputState } from "../_recoil/state";
import { categoryCode, idxToCategory } from "../attributes/categories";
import { basicsEN } from "../attributes/basics";
import { basicsBEtoFE } from "../attributes/converter";
import heart from "../assets/heart.svg";
import Api from "../_axios/Api";
import { useSnackbar } from "notistack";
import NoImage from "../assets/noImage.png";
import { checksState, depositNumState, monthlyNumState, extraOptionsState, defaultRoomsState, filteredRoomsState, mapLevelState, showExtraState } from "../_recoil/state";
import { checksFilter } from "../attributes/checks";
import { optionsKR, optionsEN } from "../attributes/options";
import { TailSpin } from 'react-loader-spinner'

import { MarkersOn } from "../icons/MarkersOn";
import { MarkersOff } from "../icons/MarkersOff"
import { labels } from "../attributes/categories";

const { kakao } = window;
let map;
let geocoder = new kakao.maps.services.Geocoder();

const Map = ({ markerFilter, type, searchToggle }) => {
    // loading spinner
    const [isLoading, setIsLoading] = useState(true);

    // debounce timer
    const [timer, setTimer] = useState(null);

    // useNavigate
    const navigate = useNavigate();

    // notistack snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // recoil 상태 관리
    const [{ centerLat, centerLng }, setCenterPos] = useRecoilState(centerPosState);
    const [{ lowerLeftLat, lowerLeftLng }, setLowerLeftPos] = useRecoilState(lowerLeftPosState);
    const [{ upperRightLat, upperRightLng }, setUpperRightPos] = useRecoilState(upperRightPosState);
    const [searchInput, setSearchInput] = useRecoilState(searchInputState);
    const checks = useRecoilValue(checksState);
    const depositNum = useRecoilValue(depositNumState);
    const monthlyNum = useRecoilValue(monthlyNumState);
    const extraOptions = useRecoilValue(extraOptionsState);
    const [defaultRooms, setDefaultRooms] = useRecoilState(defaultRoomsState);
    const [filteredRooms, setFilteredRooms] = useRecoilState(filteredRoomsState);
    const [mapLevel, setMapLevel] = useRecoilState(mapLevelState);
    const showExtra = useRecoilValue(showExtraState);
    
    const [subway, setSubway] = useState([]);
    const [mart, setMart] = useState([]);
    const [store, setStore] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [cafe, setCafe] = useState([]);
    const [hospital, setHospital] = useState([]);
    const [pharmacy, setPharmacy] = useState([]);
    const [agent, setAgent] = useState([]);
    const [markers, setMarkers] = useState(Array(9).fill(1));

    const handleMarkers = (i, mode) => {
        let newMarkers = [...markers];
        if (i !== 7 && newMarkers[i]) { newMarkers[i] = 0; }
        else { newMarkers[i] = 1; }
        setMarkers(newMarkers);

        switch (idxToCategory[i]) {
            case "SW8": 
                for (let i=0; i<subway.length; i++) {
                    if (mode === "show") { subway[i].setMap(map); }
                    else { subway[i].setMap(null); }
                }
                break;
            case "MT1":
                for (let i=0; i<mart.length; i++) {
                    if (mode === "show") { mart[i].setMap(map); }
                    else { mart[i].setMap(null); }
                }
                break;
            case "CS2":
                for (let i=0; i<store.length; i++) {
                    if (mode === "show") { store[i].setMap(map); }
                    else { store[i].setMap(null); }
                }
                break;
            case "FD6":
                for (let i=0; i<restaurant.length; i++) {
                    if (mode === "show") { restaurant[i].setMap(map); }
                    else { restaurant[i].setMap(null); }
                }
                break;
            case "CE7":
                for (let i=0; i<cafe.length; i++) {
                    if (mode === "show") { cafe[i].setMap(map); }
                    else { cafe[i].setMap(null); }
                }
                break;
            case "HP8":
                for (let i=0; i<hospital.length; i++) {
                    if (mode === "show") { hospital[i].setMap(map); }
                    else { hospital[i].setMap(null); }
                }
                break;
            case "PM9":
                for (let i=0; i<pharmacy.length; i++) {
                    if (mode === "show") { pharmacy[i].setMap(map); }
                    else { pharmacy[i].setMap(null); }
                }
                break;
            case "":
                enqueueSnackbar("방문매물은 필수 표시 항목입니다", {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    autoHideDuration: 2000,
                    sx: {
                        "& .SnackbarContent-root": {
                            bgcolor: "#0040BD"
                        }
                    }
                });
            case "AG2":
                for (let i=0; i<agent.length; i++) {
                    if (mode === "show") { agent[i].setMap(map); }
                    else { agent[i].setMap(null); }
                }
                break;
            default:
                break;
        }
    }

    // 주변 시설 마커 및 인포윈도우 표시
    const displayFacilities = (position, category, place) => {
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

        return marker;
    }

    // 주변 시설 불러오기
    const getFacilities = useCallback(async () => {
        if (type === "compare") {
            let ar;
            if (markers[7]) {
                await Api.get("/api/v1/checklist/")
                .then((res) => {
                    ar = res.data.checklists;
                })
                .catch((err) => console.log(err))
            }

            
            for (let i=0; i<ar.length; i++) {
                const element = ar[i];
                const position = new kakao.maps.LatLng(element.roomInfo.basicInfo_location_x, element.roomInfo.basicInfo_location_y);

                let places = new kakao.maps.services.Places();
                let callback = async (status, result, pagination) => {
                    if (result === "OK") {
                        const newArr = [];
                        const len = Math.min(10, status.length);
                        for (let i=0; i<len; i++) {
                            const marker = displayFacilities(new kakao.maps.LatLng(status[i].y, status[i].x), status[0].category_group_code, status[i]);
                            newArr.push(marker);
                        }

                        const code = status[0].category_group_code;
                        switch (code) {
                            case "SW8": 
                                setSubway((prev) => [...prev, ...newArr]);
                                break;
                            case "MT1":
                                setMart((prev) => [...prev, ...newArr]);
                                break;
                            case "CS2":
                                setStore((prev) => [...prev, ...newArr]);
                                break;
                            case "FD6":
                                setRestaurant((prev) => [...prev, ...newArr]);
                                break;
                            case "CE7":
                                setCafe((prev) => [...prev, ...newArr]);
                                break;
                            case "HP8":
                                setHospital((prev) => [...prev, ...newArr]);
                                break;
                            case "PM9":
                                setPharmacy((prev) => [...prev, ...newArr]);
                                break;
                            case "AG2":
                                setAgent((prev) => [...prev, ...newArr]);
                                break;
                            default:
                                break;
                        }
                    }
                };

                
                for (let i=0; i<9; i++) {
                    if (i === 7) { continue; }
                    if (markers[i]) {
                        places.categorySearch(Object.keys(categoryCode)[i], callback, {
                            location: position ? position : new kakao.maps.LatLng(centerLat, centerLng)
                        });
                    }
                }
            }
        }
        
        else {
            let places = new kakao.maps.services.Places();
            let callback = function(status, result, pagination) {
                if (result === "OK") {
                    const len = Math.min(10, status.length);
                    for (let i=0; i<len; i++) {
                        displayFacilities(new kakao.maps.LatLng(status[i].y, status[i].x), status[0].category_group_code, status[i]);
                    }
                }
            };

            for (let i=0; i<9; i++) {
                if (i === 7) { continue; }
                places.categorySearch(Object.keys(categoryCode)[i], callback, {
                    location: new kakao.maps.LatLng(centerLat, centerLng)
                });
            }
        }
        
    }, [centerLat, centerLng]);

    // 매물 위치 불러오기
    const getOneRoom = useCallback(() => {
        let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(centerLat, centerLng),
            zIndex: 99,
        });
        marker.setMap(map);
    }, [centerLat, centerLng]);

    // 매물/체크리스트 마커 및 인포윈도우 표시
    const displayObjs = useCallback((arr, obj) => {
        let clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 3,
            minClusterSize: 1
        });

        kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
            var level = map.getLevel()-1;
            setMapLevel(level);
            map.setLevel(level, {anchor: cluster.getCenter()});
        });

        let bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<arr.length; i++) {
            const element = arr[i];
            let position = new kakao.maps.LatLng(element.roomInfo.basicInfo_location_x, element.roomInfo.basicInfo_location_y);
            let marker = new kakao.maps.Marker({
                position,
                clickable: true,
                zIndex: 99,
            });

            if (obj === "interest" || obj === "checklist") {
                let markerImage = obj === "interest" ? new kakao.maps.MarkerImage(heart, new kakao.maps.Size(36, 36)) : new kakao.maps.MarkerImage(Markers["방문매물"], new kakao.maps.Size(36, 36));
                marker.setImage(markerImage);
                bounds.extend(position);
            }
            
            kakao.maps.event.addListener(marker, "click", function() {
                if (obj === "room" || obj === "interest") { navigate(`/details/${element.room_id}`); }
                else { navigate(`/edit_checklist/${element.checklist_id}`)}
            });

            let iwContent = `
            <div style="display:flex; flex-direction:column; width: 200px; padding: 5px 5px 7px 5px; font-family: 'Noto Sans KR', sans-serif;">
                <img style="margin-bottom: 5px;" src=${element.images.length === 0 ? NoImage : `${process.env.REACT_APP_BASE_URL}${element.images[0]}`}>
                <div style="font-size: 12px; font-weight: 400;">
                    <div style="margin-bottom: 5px;">
                        <span style="color: #0040BD;">${basicsBEtoFE[element.roomInfo[basicsEN[11]]]}</span>
                        <span style="color: #B7B7B7;">${element.roomInfo[basicsEN[10]]}평</span>
                        <span style="color: #0040BD;">보증금</span>
                        <span style="color: #B7B7B7;">${element.roomInfo[basicsEN[6]] / 10000}만원</span>
                    </div>
                    <div style="margin-bottom: 5px;">
                        <span style="color: #0040BD;">월세</span>
                        <span style="color: #B7B7B7;">${element.roomInfo[basicsEN[7]] / 10000}만원</span>
                        <span style="color: #0040BD;">관리비</span>
                        <span style="color: #B7B7B7;">${element.roomInfo[basicsEN[8]] / 10000}만원</span>
                    </div>
                    <div>${element.roomInfo.basicInfo_address}</div>
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

            clusterer.addMarker(marker);

            //if (obj === "checklist") { getFacilities(arr); }
        }

        if (obj === "interest" || obj === "checklist") {
            map.setBounds(bounds);
        }
    }, [/*getFacilities*/]);

    // 필터링
    const filterRooms = useCallback((rooms) => {
        const sliderFiltered = rooms.filter((room) =>
            room.roomInfo.basicInfo_deposit >= depositNum.min
            && room.roomInfo.basicInfo_deposit <= depositNum.max
            && room.roomInfo.basicInfo_monthly_rent >= monthlyNum.min
            && room.roomInfo.basicInfo_monthly_rent <= monthlyNum.max
        );
        
        let checksFiltered = [...sliderFiltered];
        for (let i=0; i<7; i++) {
            if (!checks[i]) {
                checksFiltered = checksFiltered.filter((room) => room.roomInfo[checksFilter[i][0]] !== checksFilter[i][1]);
            }
        }

        let optionsFiltered = [];
        checksFiltered.forEach((room) => {
            let isValid = true;
            for (let i=0; i<16; i++) {
                if (extraOptions[optionsKR[i]] && room.roomInfo[optionsEN[i]] === false) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) { optionsFiltered.push(room); }
        });

        setFilteredRooms(filteredRooms);
        displayObjs(optionsFiltered, "room");
    }, [depositNum, monthlyNum, checks, extraOptions]);


    // 매물 조회 GET
    const getRooms = useCallback(async (boundsChanged) => {
        if (defaultRooms.length === 0 || boundsChanged) {
            await Api.get(`/api/v1/rooms/?location=[[${lowerLeftLat},${lowerLeftLng}],[${centerLat},${centerLng}],[${upperRightLat},${upperRightLng}]]`)
            .then((res) => {
                console.log(res);
                setDefaultRooms(res.data.rooms.slice(0, 60));
                filterRooms(res.data.rooms);
                setIsLoading(false);
            })
            .catch((err) => console.log(err))                
        }
        else {
            filterRooms(defaultRooms);
        }
    }, [lowerLeftLat, lowerLeftLng, centerLat, centerLng, upperRightLat, upperRightLng, filterRooms]);
    
    // 관심매물 조회 GET
    const getInterests = useCallback(async () => {
        await Api.get("/api/v1/interest/")
        .then((res) => {
            if (res.data.length !== 0) {
                displayObjs(res.data, "interest");
            }
        })
        .catch((err) => console.log(err))
    }, [displayObjs]);

    // 체크리스트 조회 GET
    const getChecklists = useCallback(async () => {
        if (markers[7]) {
            await Api.get("/api/v1/checklist/")
            .then((res) => {
                
                if (res.data.checklists.length !== 0) {
                    displayObjs(res.data.checklists, "checklist");
                }
            })
            .catch((err) => console.log(err))
        }
    }, [/*markers,*/ displayObjs]);

    // getInfos (according to map type)
    const getInfos = useCallback(async () => {
        if (type === "normal") {
            getRooms(false);
        }
        else if (type === "wish") {
            getInterests();
        }
        else if (type === "compare") {
            getChecklists();
            // getFacilities();
        }
        else if (type === "details") {
            getOneRoom();
            getFacilities();
        }
    }, [type, getRooms, getInterests, getChecklists, getOneRoom, /*getFacilities*/]);
    
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
    }, [setLowerLeftPos, setUpperRightPos]);

    // navigator.geolocation onValid callback
    const onValid = useCallback((pos) => {
        if (searchInput) {
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    setCenterPos({centerLat: result[0].y, centerLng: result[0].x});
                } 
            }
            geocoder.addressSearch(searchInput, callback);
        }
        else {
            setCenterPos({
                centerLat: pos.coords.latitude,
                centerLng: pos.coords.longitude,
            });    
        }
        updateBounds();
    }, [setCenterPos, updateBounds, searchInput]);

    // navigator.getolocation onInvalid callback
    const onInvalid = useCallback(() => {
        if (searchInput) {
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    setCenterPos({centerLat: result[0].y, centerLng: result[0].x});
                } 
            }
            geocoder.addressSearch(searchInput, callback);
        }
        updateBounds();

        console.log("위치 액세스 차단 상태");
    }, [setCenterPos, updateBounds, searchInput]);

    useEffect(() => {
        // 현재 위치 정보 가져오기
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(onValid, onInvalid); }
        else { console.log("geolocation 사용 불가"); }
    }, [onValid, onInvalid]);

    useEffect(() => {
        if (type === "normal") {
            getRooms(true);
        }
    }, [type, centerLat, centerLng, getRooms]);
    
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
        else { map.setMaxLevel(8); }

        // 지도 타입에 맞게 정보 업데이트
        getInfos();

        // 전체 매물 검색 지도일 경우 줌/드래그 이벤트 설정
        if (type === "normal") {
            // 줌(확대/축소) 이벤트 등록 + 디바운스 적용
            kakao.maps.event.addListener(map, 'zoom_changed', function() {
                let currentLevel = map.getLevel();
                if (currentLevel > mapLevel) {
                    if (timer) { clearTimeout(timer); }
                    setTimer(setTimeout(() => {
                        if (currentLevel >= 6) { setIsLoading(true); }

                        setTimeout(() => {
                            setCenterPos({
                                centerLat: map.getCenter().getLat(),
                                centerLng: map.getCenter().getLng(),
                            });
                            updateBounds();
                            getRooms(true);
                        }, 2000)
                    }, 500));
                }
                
                setMapLevel(currentLevel);

                if (currentLevel >= 8) {
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
                }
            });

            // 드래그(이동) 이벤트 등록 + 디바운스 적용
            kakao.maps.event.addListener(map, "dragend", function() {
                geocoder.coord2Address(map.getCenter().getLng(), map.getCenter().getLat(), (result, status) => { 
                    if (status === kakao.maps.services.Status.OK) {
                        setSearchInput(result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name);
                    }
                });

                if (timer) { clearTimeout(timer); }
                setTimer(setTimeout(() => {
                    if (map.getLevel() >= 6) { setIsLoading(true); }

                    setTimeout(() => {
                        let latlng = map.getCenter();
                        let currentBounds = map.getBounds();
                        //console.log("이전 지도 중심좌표 ", centerLat, centerLng);
                        //console.log("변경된 지도 중심좌표 " + latlng );
                        //console.log("변경된 영역 ", currentBounds);
    
                        if (centerLat > currentBounds.getNorthEast().getLat() || centerLat < currentBounds.getSouthWest().getLat()
                        || centerLng > currentBounds.getNorthEast().getLng() || centerLng < currentBounds.getSouthWest().getLng()) {
                            setCenterPos({
                                centerLat: map.getCenter().getLat(),
                                centerLng: map.getCenter().getLng(),
                            });
                            updateBounds();
                            getRooms(true);
                        }
                    }, 1000)
                }, 1000));
            });
        }
    }, [timer, type, updateBounds, getInfos, getRooms, setSearchInput, setCenterPos]);

    // 검색이벤트 발생 시 지도 중심 업데이트 및 범위 상태관리
    useEffect(() => {
        map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
        updateBounds();
    }, [centerLat, centerLng, searchToggle, updateBounds])

    useEffect(() => {
        if (type === "compare") {
            getFacilities();
        }
    }, [])

    return (
        <>  
            {type === "compare" &&
            <div className={styles.markers}>
                {markers.map((value, i) => {
                    if (value) {
                        return <div key={"markerOn" + i} onClick={() => { handleMarkers(i, "hide"); }}>{MarkersOn[labels[i]]()}</div> 
                    } else {
                        return <div key={"markerOff" + i} onClick={() => { handleMarkers(i, "show"); }}>{MarkersOff[labels[i]]()}</div>
                    }
                })}
            </div>
            }
            <div id="map" className={styles.map}>
                {type === "normal" && isLoading &&
                <div className={styles.spinner}>
                    <TailSpin color="#0040BD"></TailSpin>
                    <span>
                        매물을 조회하는 중입니다
                        <br/>
                        <br/>
                        잠시만 기다려주세요
                    </span>
                </div>
                }
                {type === "normal" && showExtra && 
                <div className={styles.translucent}>
                </div>
                }
            </div>
        </>
    );
}

export default Map;