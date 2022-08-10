import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import SearchBox from "../components/SearchBox";
import styles from "../styles/pages/main.module.scss";
import axios from "axios";

const Main = () => {
    /* API TEST */
    const getRooms = async () => {
        const firstLat = 37.5665;
        const firstLng = 126.97423268424383;

        const secondLat = 37.566783658885626;
        const secondLng = 126.97865792991867;

        const thirdLat = 37.56820802746253;
        const thirdLng = 126.98363800062684;

        // 매물 조회 SUCCESS ✅
        await axios.get(`http://localhost:8000/api/v1/rooms/?location=[[${firstLat},${firstLng}],[${secondLat},${secondLng}],[${thirdLat},${thirdLng}]]`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    /************/

    useEffect(() => {
        getRooms(); // api test
    });
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