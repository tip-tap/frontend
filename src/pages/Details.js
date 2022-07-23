import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Slider from "react-slick";
import GetListBtn from "../components/GetListBtn";
import styles from "../styles/pages/details.module.scss";
import img1 from "../dummy/1.jpg";
import img2 from "../dummy/2.jpg";
import img3 from "../dummy/3.jpg";
import img4 from "../dummy/4.jpg";
import img5 from "../dummy/5.jpg";
import img6 from "../dummy/6.jpg";
import img7 from "../dummy/7.jpg";


const imgArr = [img1, img2, img3, img4, img5, img6, img7];
const headers = ["기본정보", "옵션", "주변시설", "공인중개사"];

const Details = () => {
    const [isActive, setIsActive] = useState(0);
    
    return (
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.slider}>
                    <Slider
                        infinite={false}
                        swipeToSlide={true}
                        slidesToShow={5}
                    >
                        {imgArr.map((v, i) =>
                            <div key={i}>
                                <img className={styles.slide} src={v} alt="dummy data" />
                            </div>
                        )}
                    </Slider>
                </section>
                <section className={styles.btn}>
                    <GetListBtn />
                </section>
                <section className={styles.info}>
                    <article className={styles.header}>
                        {headers.map((value, i) => 
                            <span key={i} className={isActive === i && styles.active} onClick={() => { setIsActive(i); }}>{value}</span>
                        )}
                    </article>
                    <article className={styles.body}>
                        
                    </article>
                </section>
            </div>
        </Layout>
    );
}

export default Details;