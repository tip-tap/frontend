import React, {useState} from "react";
import HeartImg from "../assets/heart.svg";
import EmptyHeart from "../assets/emptyheart.svg";
import styles from "../styles/components/HeartBtn.module.scss";

const HeartBtn = (id) => {

    const [wish, setWish] = useState(Array(7).fill(false));

    const handleWish = (e, id) => {
        let newWish = [...wish];
        newWish[id] = e.target.checked;
        setWish(newWish);
    }

    return (
        <>
            <input type = "checkbox" className={styles.input} id = {id} onChange = {(e) => handleWish(e, id)}/>
            <label htmlFor={id}><img src = {wish[id]? HeartImg :EmptyHeart}/></label>
        </>
    );
};


export default HeartBtn;