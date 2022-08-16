import React from "react";
import styles from "../styles/components/list.module.scss";
import DetailsBtn from "../components/DetailsBtn";
import HeartBtn from "../components/HeartBtn";
import { Link } from "react-router-dom";

const time = "2일전";

const List = ({ id, tag, area, deposit, rent, mtnfee, thumbnail, interest }) => {

    // object

    const basics = {
        "원룸": area,
        "보증금":deposit,
        "월세":rent,
        "관리비":mtnfee
    };
    // console.log(basics);

    const displayBasics = (key, value) =>{
        console.log(key);
        console.log(value);
        if (key === "원룸"){return value + "평";}
        else if (key === "보증금"){return value/10000 + "만원" ;}
        else if (key === "월세"){return value/10000+"만원" ;}
        else if (key === "관리비"){return value/10000+ "만원";}
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className = {styles.imgposition}>
                    <img className={styles.image} src = {thumbnail} alt = 'listimg' >
                    </img>
                    <div className = {styles.heartbtn}>
                        <HeartBtn like = {interest} id = {id}></HeartBtn> 
                    </div>
                </div>
                <div className = {styles.basicswrapper}>
                    {Object.keys(basics).map((key,index)=>(
                        <div  key={`basic - ${key}`} className={styles.basicsItem}>
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
                            {time}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;