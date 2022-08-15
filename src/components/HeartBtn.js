import React, {useEffect, useState} from "react";
import HeartImg from "../assets/heart.svg";
import EmptyHeart from "../assets/emptyheart.svg";
import styles from "../styles/components/HeartBtn.module.scss";
import axios from "axios";

const HeartBtn = ({like, id}) => {
    console.log({id});
    const [wish, setWish] = useState(false);

    const postWish = async ({id}) =>{
        console.log("post");
        await axios({
            method: "post",
            url: "http://localhost:8000/api/v1/interest/",
            data:{
                room_id: {id}
            }
        })
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }

    const deleteWish = async({id}) => {
        console.log("delete");
        await axios.delete(`http://localhost:8000/api/v1/interest/${id}/`)
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err))
    }

    const handleWish = () => {
        if (wish === false){
            console.log("등록");
            postWish();
        }
        else if (wish === true){
            console.log("삭제");
            deleteWish();
        }
        setWish(!wish);
    }

    return (
        <>
            <button className={styles.input} id = {id} onClick={handleWish}>
                <img src = {wish ? HeartImg : EmptyHeart}/>
            </button>
        </>
    );
};


export default HeartBtn;