import React from "react";
import styles from "../styles/components/list.module.scss";
import DetailsBtn from "../components/DetailsBtn";
import HeartBtn from "../components/HeartBtn";
import { Link } from "react-router-dom";
import NoImage from "../assets/noImage.png";

const List = ({ id, tag, area, deposit, rent, mtnfee, thumbnail, interest, time, roomtype, roomnum }) => {
    const createTime = (time) => {
        const today = new Date();
        const timeValue = new Date(time);
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }


    const basics = {
        "원룸": area,
        "보증금":deposit,
        "월세":rent,
        "관리비":mtnfee
    };

    const displayBasics = (key, value) =>{
        if (key === "원룸"){return value + "평";}
        else if (key === "보증금"){ return value ? (value >= 99999999 ? Math.floor(value / 100000000) + "억 " : "") + value % 100000000 / 10000 + "만원" : "-"; }
        else if (key === "월세"){return value/10000+"만원" ;}
        else if (key === "관리비"){return value/10000+ "만원";}
    };

    const displayKey = (key) => {
        if (key === "원룸" && roomnum ==="1"){ return key}
        else if (key === "원룸" && roomnum ==="1.5"){ return "1.5룸"}
        else if (key === "원룸" && roomnum ==="2"){ return "투룸"}
        else if (key === "원룸" && roomnum ==="3"){ return "쓰리룸"}
        else if (key === "보증금"){return key}
        else if (key === "월세"){ return key}
        else if (key === "관리비"){return key}
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className = {styles.imgposition}>
                    <img className={styles.image} src = {thumbnail.length === 0 ? NoImage : `${process.env.REACT_APP_BASE_URL}${thumbnail}`} alt = 'listimg' >
                    </img>
                    <div className = {styles.heartbtn}>
                        <HeartBtn like = {interest} id = {id}></HeartBtn> 
                    </div>
                </div>
                <div className = {styles.basicswrapper}>
                    {Object.keys(basics).map((key,index)=>(
                        <div  key={`basic - ${key}`} className={styles.basicsItem}>
                            <div className={styles.itemTitle}>
                                {displayKey(key)}
                            </div>
                            <div className={styles.itemContent}>
                                {displayBasics(key, basics[key])}
                            </div>
                        </div>
                    ))}
                </div>
                <div className = {styles.detailsbtn}>
                    <Link to={`/details/${id}`}>
                        <DetailsBtn type="primary-l" />
                    </Link>
                </div>
                <div className={styles.underwrapper}>
                    <div className={styles.tagswrapper}>
                        {Object.keys(tag).map((key,index)=>(
                            <div key={`tag - ${key}`} className={styles.tag}>
                                {'#'}{tag[index]}
                            </div>
                        ))}
                    </div>
                    <div className={styles.timewrapper}>
                        <div className={styles.time}>
                            {createTime(time)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;