import React, {useEffect, useState} from "react";
import HeartImg from "../assets/heart.svg";
import EmptyHeart from "../assets/emptyheart.svg";
import styles from "../styles/components/HeartBtn.module.scss";
import Api from "../_axios/Api";

const HeartBtn = ({like, id, toggle, setToggle}) => {
    //console.log(id);
    //console.log(like);
    const [wish, setWish] = useState(like);

    const postWish = async (id) =>{
        //console.log("post");
        await Api({
            method: "post",
            url: "/api/v1/interest/",
            data:{
                room_id: id
            }
        })
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }

    const deleteWish = async(id) => {
        //console.log("delete");
        await Api.delete(`/api/v1/interest/${id}/`)
        .then((res)=> {
            console.log(res);
            setToggle(!toggle);
        })
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err))
    }
    


    const handleWish = (id) => {
        if (wish === false){
            //console.log("등록");
            postWish(id);
        }
        else if (wish === true){
            //console.log("삭제");
            deleteWish(id);
        }
        setWish(!wish);
    }

    return (
        <>
            <button className={styles.input} onClick={() => handleWish(id)}>
                <img src = {wish ? HeartImg : EmptyHeart}/>
            </button>
        </>
    );
};


export default HeartBtn;