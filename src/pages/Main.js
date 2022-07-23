import React from "react";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import SearchBox from "../components/SearchBox";
import styles from "../styles/pages/main.module.scss";

const Main = () => {
    return (
        <Layout>
            <div>
                <section className={styles.greeting}>
                    <article className={styles.left}>
                        <p>
                            내가 방문한 매물을
                            <br/>
                            보다 자세히 체크하고 싶다면?
                        </p>
                        <CreateListBtn pos="main" />
                    </article>
                    <article className={styles.right}>
                        <p>
                            검색을 통해서
                            <br/>
                            매물을 확인해 보세요
                        </p>
                        <SearchBox pos="main" />
                    </article>
                </section>
            </div>
        </Layout>
    );
}

export default Main;