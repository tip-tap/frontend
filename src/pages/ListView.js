import React, {useState} from "react";
import styles from "../styles/pages/listView.module.scss";
import SearchBox  from "../components/SearchBox";
import Layout from "../components/common/Layout";
import List from "../components/List";
import Toggle from "../components/common/Toggle";

const ListView = () => {
    return(
        <Layout>
            <div className = {styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" withFilter={true} />
                </section>
                <Toggle active="list" mapLink="/map" listLink="/list" />
                <section className = {styles.listDiv}>
                    <List id={1} />
                    <List id={2} />
                    <List id={3} />
                    <List id={4} />
                    <List id={5} />
                    <List id={6} />
                    <List id={7} />
                </section>
            </div>
        </Layout>
    );
}

export default ListView;