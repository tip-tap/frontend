import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/wishlistview.module.scss";
import Layout from "../components/common/Layout";
import WishList from "../components/WishList";
import Api from "../_axios/Api";
import SearchBox from "../components/SearchBox";
import Toggle from "../components/common/Toggle";

const WishListView = () => {

    const [wishlist, setWishlist] = useState([]);

    const getWishlist = useCallback(async()=>{
        await Api.get(`/api/v1/interest/`)
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

    return(
        <Layout active="wish">
            <div className = {styles.wrapper}>
                <Toggle active="list" mapLink="/wishmap" listLink="/wishlist" />
                <section className = {styles.listDiv}>
                    {wishlist.map((value)=>{
                            return(
                                <WishList id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail}/>
                            )
                    })}
                </section>
            </div>
        </Layout>
    );
}

export default WishListView;