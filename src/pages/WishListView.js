import React, {useState, useEffect, useCallback} from "react";
import styles from "../styles/pages/wishlistview.module.scss";
import Layout from "../components/common/Layout";
import WishList from "../components/WishList";
import Api from "../_axios/Api";
import SearchBox from "../components/SearchBox";
import Toggle from "../components/common/Toggle";
import SEO from '../components/common/SEO';

const WishListView = () => {

    const [wishlist, setWishlist] = useState([]);
    const [toggle, setToggle] = useState(false);

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
    },[toggle])

    return(
        <>
            <SEO
                pageTitle="이집저집 | 관심 매물"
                pageSEO={{desc: "관심 매물만 모아서 따로 확인해보세요 💙", url: "/wishlist"}}
            />
            <Layout active="wish">
                <div className = {styles.wrapper}>
                    <Toggle active="list" mapLink="/wishmap" listLink="/wishlist" />
                    <section className = {styles.listDiv}>
                        {wishlist.map((value)=>{
                                return(
                                    <WishList key = {value.room_id} id={value.room_id} tag={value.tag} area={value.roomInfo.basicInfo_area} deposit = {value.roomInfo.basicInfo_deposit} rent = {value.roomInfo.basicInfo_monthly_rent} mtnfee = {value.roomInfo.basicInfo_maintenance_fee} thumbnail = {value.thumbnail} toggle = {toggle} setToggle = {setToggle} time = {value.room_created_at}/>
                                )
                        })}
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default WishListView;