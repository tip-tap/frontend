import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/listView.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import List from "../components/List";
<<<<<<< Updated upstream

const ListView = () => {
    // eslint-disable-next-line
    const [centerLat, setCenterLat] = useState(-1);
    // eslint-disable-next-line
    const [centerLng, setCenterLng] = useState(-1);
=======
import Toggle from "../components/common/Toggle";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { centerPosState, lowerLeftPosState, upperRightPosState } from "../_recoil/state";

const ListView = () => {

    const { centerLat, centerLng } = useRecoilValue(centerPosState);
    const { lowerLeftLat, lowerLeftLng } = useRecoilValue(lowerLeftPosState);
    const { upperRightLat, upperRightLng } = useRecoilValue(upperRightPosState);


    const [list, setList] = useState([]);

    const getList = useCallback(async()=>{
        await axios.get(`http://localhost:8000/api/v1/rooms/?location=[[${lowerLeftLat},${lowerLeftLng}],[${centerLat},${centerLng}],[${upperRightLat},${upperRightLng}]]`)
        .then((res) => {
            console.log(res);
            const listInfo = [];
            res.data.rooms.forEach((rooms, index) => {
                listInfo[index] = rooms;
            });
            setList(listInfo);
            console.log(listInfo);
            console.log(listInfo.room_created_at);
        })
        .catch((err)=> console.log(err))
    },[lowerLeftLat, lowerLeftLng, centerLat, centerLng, upperRightLat, upperRightLng]);

    useEffect(()=>{
        getList();
    },[])

>>>>>>> Stashed changes

    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} setCenterLat={setCenterLat} setCenterLng={setCenterLng}/>
                </section>
                <section className = {styles.listDiv}>
<<<<<<< Updated upstream
                    <List id={1} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={2} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={3} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={4} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={5} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={6} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={7} centerLat={centerLat} centerLng={centerLng}/>
=======
                    {list.map((value)=>{
                            return(
                                <List id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail}/>
                            )
                    })}
>>>>>>> Stashed changes
                </section>
            </div>
        </Layout>
    );
}

export default ListView;