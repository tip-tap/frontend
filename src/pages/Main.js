import React from "react";
import Layout from "../components/common/Layout";
import styles from "../styles/pages/main.module.scss";

const Main = () => {
    return (
        <Layout>
            <div>
                <section className={styles.upper}>Main Page!</section>
                <section className={styles.lower}>임시 메인 페이지</section>
            </div>
        </Layout>
    );
}

export default Main;