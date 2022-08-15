import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/wishlistview.module.scss";
import Layout from "../components/common/Layout";
import WishList from "../components/WishList";
<<<<<<< Updated upstream

const WishListView = () => {
    // eslint-disable-next-line
    const [centerLat, setCenterLat] = useState(-1);
    // eslint-disable-next-line
    const [centerLng, setCenterLng] = useState(-1);

=======
import Toggle from "../components/common/Toggle";
import axios from "axios";


const WishListView = () => {

    const [wishlist, setWishlist] = useState([]);

    const getWishlist = useCallback(async()=>{
        await axios.get(`http://localhost:8000/api/v1/interest/`)
        .then((res) => {
            //console.log(res);
            const wishlistInfo = [];
            res.data.forEach((rooms, index) => {
                wishlistInfo[index] = rooms;
            });
            setWishlist(wishlistInfo);
        })
        .catch((err)=> console.log(err))
    },[]);

    useEffect(()=>{
        getWishlist();
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
                    <WishList id={1} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={2} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={3} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={4} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={5} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={6} centerLat={centerLat} centerLng={centerLng}/>
                    <WishList id={7} centerLat={centerLat} centerLng={centerLng}/>
=======
                    {wishlist.map((value)=>{
                                return(
                                    <WishList id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail}/>
                                )
                    })}
>>>>>>> Stashed changes
                </section>
            </div>
        </Layout>
    );
}

export default WishListView;