import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/listView.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import List from "../components/List";
import { useRecoilValue, useRecoilState } from "recoil";
import { defaultRoomsState, filteredRoomsState, showExtraState } from "../_recoil/state";
import Toggle from "../components/common/Toggle";
import {checksState, depositNumState, monthlyNumState, extraOptionsState } from "../_recoil/state";
import { checksFilter } from "../attributes/checks";
import { optionsKR, optionsEN } from "../attributes/options";
import SEO from '../components/common/SEO';
import { ReactComponent as NoResult } from "../assets/noresult.svg";

const ListView = () => {

    const checks = useRecoilValue(checksState);
    const depositNum = useRecoilValue(depositNumState);
    const monthlyNum = useRecoilValue(monthlyNumState);
    const extraOptions = useRecoilValue(extraOptionsState);
    const [defaultRooms, setDefaultRooms] = useRecoilState(defaultRoomsState);
    const [filteredRooms, setFilteredRooms] = useRecoilState(filteredRoomsState);
    const showExtra = useRecoilValue(showExtraState);

    const [list, setList] = useState([]);

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
        setList(optionsFiltered);
    }, [depositNum, monthlyNum, checks, extraOptions]);

    useEffect(()=>{
        filterRooms(defaultRooms);
    },[defaultRooms, filterRooms])

    
    return(
        <>
            <SEO
                pageTitle="이집저집 | 매물 검색"
                pageSEO={{desc: "원하는 조건에 맞게 공인중개사가 등록해놓은 매물을 검색해보세요 🔍", url: "/list"}}
            />

            <Layout active="search">
                <div className = {styles.wrapper}>
                    <section className={styles.searchDiv}>
                        <SearchBox type="long" withFilter={true}/>
                    </section>
                    <Toggle active="list" mapLink="/map" listLink="/list" />
                    <section className = {`${styles.listDiv} ${showExtra ? styles.translucent : ""}`}>
                        {list.length === 0 &&
                            <div className={styles.noresult}><NoResult/></div>
                        }
                        {list.map((value)=>{
                                return(
                                    <List id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail} interest = {value.interest} time={value.room_created_at} roomtype = {value.roomInfo.basicInfo_room_type} roomnum = {value.roomInfo.basicInfo_number_of_rooms} />
                                )
                        })}
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default ListView;