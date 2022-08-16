import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/listView.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import List from "../components/List";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState } from "../_recoil/state";
import Toggle from "../components/common/Toggle";
import {checksState, depositNumState, monthlyNumState, extraOptionsState} from "../_recoil/state";

const ListView = () => {
 
    const { centerLat, centerLng } = useRecoilValue(centerPosState);
    const { lowerLeftLat, lowerLeftLng } = useRecoilValue(lowerLeftPosState);
    const { upperRightLat, upperRightLng } = useRecoilValue(upperRightPosState);

    const depositNum = useRecoilValue(depositNumState);
    const monthlyNum = useRecoilValue(monthlyNumState);
    const checks = useRecoilValue(checksState);

    console.log(checks[0]);
    console.log(checks[1]);
    console.log(checks[2]);
    console.log(checks[3]);
    console.log(checks[4]);
    console.log(checks[5]);
    console.log(checks[6]);

    console.log(depositNum.max, depositNum.min);
    console.log(monthlyNum.max, monthlyNum.min);

    const result = list.filter(()=>{
        
    })


    const [list, setList] = useState([]);

    const getList = useCallback(async()=>{
        await axios.get(`http://localhost:8000/api/v1/rooms/?location=[[${lowerLeftLat},${lowerLeftLng}],[${centerLat},${centerLng}],[${upperRightLat},${upperRightLng}]]`)
        .then((res) => {
            //console.log(res);
            const listInfo = [];
            res.data.rooms.forEach((rooms, index) => {
                listInfo[index] = rooms;
            });
            setList(listInfo);
            //console.log(listInfo);
            //console.log(listInfo.room_created_at);
        })
        .catch((err)=> console.log(err))
    },[lowerLeftLat, lowerLeftLng, centerLat, centerLng, upperRightLat, upperRightLng]);

    useEffect(()=>{
        getList();
    },[])

    return(
        <Layout>
            <div className = {styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true}/>
                </section>
                <Toggle active="list" mapLink="/map" listLink="/list" />
                <section className = {styles.listDiv}>
                    {list.map((value)=>{
                            return(
                                <List id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail} interest = {value.interest}/>
                            )
                    })}
                </section>
            </div>
        </Layout>
    );
}

export default ListView;