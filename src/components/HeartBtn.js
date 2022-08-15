import React, {useEffect, useState} from "react";
import HeartImg from "../assets/heart.svg";
import EmptyHeart from "../assets/emptyheart.svg";
import styles from "../styles/components/HeartBtn.module.scss";
import axios from "axios";

const HeartBtn = ({id}) => {

    const [wish, setWish] = useState(false);

    const postWish = async () =>{
        console.log("post");
        await axios({
            method: "post",
            url: "http://localhost:8000/api/v1/interest/",
            data:{
                room_id: 4
            }
        })
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }

    const deleteWish = async() => {
        console.log("delete");
        await axios.delete("https://localhost:8000/api/v1/interest/5/")
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err))
    }

    useEffect(()=>{
        deleteWish();
    },[])

    const handleWish = () => {
        if (wish === "false"){
            console.log("등록");
            postWish();
        }
        else if (wish === "true"){
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