import React, {useState} from "react";
import styles from "../styles/pages/wishlistview.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import WishList from "../components/WishList";
import Toggle from "../components/common/Toggle";

const WishListView = ({active = "list"}) => {
    return(
        <Layout active="wish">
            <div className = {styles.wrapper}>
                <Toggle active="list" mapLink="/wishmap" listLink="/wishlist" />
                <section className = {styles.listDiv}>
                    <WishList id={1} />
                    <WishList id={2} />
                    <WishList id={3} />
                    <WishList id={4} />
                    <WishList id={5} />
                    <WishList id={6} />
                    <WishList id={7} />
                </section>
            </div>
        </Layout>
    );
}

export default WishListView;