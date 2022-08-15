import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import SearchBox from "../components/SearchBox";
import styles from "../styles/pages/main.module.scss";
import axios from "axios";

const Main = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.greeting}>
                    <article className={styles.left}>
                        <div className={styles.content}>
                            <p className={styles.text}>
                                내가 방문한 매물을
                                <br/>
                                보다 자세히 체크하고 싶다면?
                            </p>
                            <Link to="/create_checklist">
                                <CreateListBtn type="primary-xl" />
                            </Link>
                        </div>
                    </article>
                    <article className={styles.right}>
                        <div className={styles.content}>
                            <p className={styles.text}>
                                검색을 통해서
                                <br/>
                                매물을 확인해 보세요
                            </p>
                            <SearchBox type="short" withFilter={false} />
                        </div>
                    </article>
                </section>
                {/* Service Guideline Section */}
            </div>
        </Layout>
    );
}

export default Main;