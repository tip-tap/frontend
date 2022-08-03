import React, {useState} from "react";
import styles from "../styles/pages/listView.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import List from "../components/List";

const ListView = () => {
    // eslint-disable-next-line
    const [centerLat, setCenterLat] = useState(-1);
    // eslint-disable-next-line
    const [centerLng, setCenterLng] = useState(-1);

    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} setCenterLat={setCenterLat} setCenterLng={setCenterLng}/>
                </section>
                <section className = {styles.listDiv}>
                    <List id={1} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={2} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={3} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={4} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={5} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={6} centerLat={centerLat} centerLng={centerLng}/>
                    <List id={7} centerLat={centerLat} centerLng={centerLng}/>
                </section>
            </div>
        </Layout>
    );
}

export default ListView;