import React, { useState , useEffect } from "react";
import styles from "../styles/components/wishlist.module.scss";
import RoomImage from "../dummy/room.png";
import DetailsBtn from "../components/DetailsBtn";
import CreateListBtn from "../components/CreateListBtn";
import HeartBtn from "../components/HeartBtn";


const basics = {
    "원룸": "5평",
    "보증금":"300만원",
    "월세":"45만원",
    "관리비":"6만원"
};

const tags = {
    "왕십리역 5분 거리":1,
    "풀옵션":1,
    "즉시입주":1
};

const time = "2일전";

const WishList = ({ id, centerLat, centerLng }) => {

    return (
        <>
            <div className={styles.wrapper}>
                <div className = {styles.imgposition}>
                    <img className={styles.image} src = {RoomImage} alt = 'listimg'>
                    </img>
                    <div className = {styles.heartbtn}>
                        <HeartBtn index = {id}></HeartBtn>
                    </div>
                </div>
                <div className = {styles.basicswrapper}>
                    {Object.keys(basics).map((key,index)=>(
                        <div className={styles.basicsItem}>
                            <div key={index} className={styles.itemTitle}>
                                {key}
                            </div>
                            <div key={index} className={styles.itemContent}>
                                {basics[key]}
                            </div>
                        </div>
                    ))}
                </div>
                <div className = {styles.detailsbtn}>
                    <CreateListBtn type = "secondary-m"/>
                    <DetailsBtn type="secondary-m" />
                </div>
                <div className={styles.underwrapper}>
                    <div className={styles.tagswrapper}>
                        {Object.keys(tags).map((key,index)=>(
                            <div key={index} className={styles.tag}>
                                {'#'}{key}
                            </div>
                        ))}
                    </div>
                    <div className={styles.timewrapper}>
                        <div className={styles.time}>
                            {time}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishList;