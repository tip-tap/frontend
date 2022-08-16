import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/wishlist.module.scss";
import DetailsBtn from "../components/DetailsBtn";
import CreateListBtn from "../components/CreateListBtn";
import HeartBtn from "../components/HeartBtn";
import NoImage from "../assets/noImage.png";


const WishList = ({ id, tag, area, deposit, rent, mtnfee, thumbnail, toggle, setToggle, time}) => {



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
        else if (key === "보증금"){return value/10000 + "만원" ;}
        else if (key === "월세"){return value/10000+"만원" ;}
        else if (key === "관리비"){return value/10000+ "만원";}
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className = {styles.imgposition}>
                    <img className={styles.image} src = {thumbnail.length === 0 ? NoImage : `http://localhost:8000${thumbnail}`} alt = 'listimg'>
                    </img>
                    <div className = {styles.heartbtn}>
                        <HeartBtn like = {true} id = {id} toggle = {toggle} setToggle={setToggle} ></HeartBtn>
                    </div>
                </div>
                <div className = {styles.basicswrapper}>
                    {Object.keys(basics).map((key,index)=>(
                        <div key={`basic - ${key}`} className={styles.basicsItem}>
                            <div className={styles.itemTitle}>
                                {key}
                            </div>
                            <div className={styles.itemContent}>
                                {displayBasics(key, basics[key])}
                            </div>
                        </div>
                    ))}
                </div>
                <div className = {styles.detailsbtn}>
                    <Link to={`/open_checklist/${id}`}>
                        <CreateListBtn type = "secondary-m"/>
                    </Link>
                    <Link to={`/details/${id}`}>
                        <DetailsBtn type="secondary-m" />
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

export default WishList;