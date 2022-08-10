import React, {useState} from "react";
import styles from "../styles/pages/wishlistview.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import WishList from "../components/WishList";

const WishListView = () => {
    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} />
                </section>
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