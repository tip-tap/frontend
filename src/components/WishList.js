import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/wishlist.module.scss";
import RoomImage from "../dummy/room.png";
import DetailsBtn from "../components/DetailsBtn";
import CreateListBtn from "../components/CreateListBtn";
import HeartBtn from "../components/HeartBtn";


const time = "2일전";

const WishList = ({ id, tag, area, deposit, rent, mtnfee, thumbnail }) => {
    //console.log({id});
    
    const basics = {
        "원룸": {area},
        "보증금":{deposit},
        "월세":{rent},
        "관리비":{mtnfee}
    };

    const displayBasics = (key, value) =>{
        //console.log(key);
        //console.log(value["deposit"]);
        if (key === "원룸"){return value["area"] + "평";}
        else if (key === "보증금"){return value["deposit"]/10000 + "만원" ;}
        else if (key === "월세"){return value["rent"]/10000+"만원" ;}
        else if (key === "관리비"){return value["mtnfee"]/10000+ "만원";}
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className = {styles.imgposition}>
                    <img className={styles.image} src = {RoomImage} alt = 'listimg'>
                    </img>
                    <div className = {styles.heartbtn}>
                        <HeartBtn wish = {true} index = {{id}}></HeartBtn>
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
                    <Link to="/create_checklist">
                        <CreateListBtn type = "secondary-m"/>
                    </Link>
                    <DetailsBtn type="secondary-m" />
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
                            {time}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishList;