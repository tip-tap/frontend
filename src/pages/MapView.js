import React, { Fragment, useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/SearchBox";
import Map from "../components/Map";
import CustomSlider from "../components/CustomSlider";
import styles from "../styles/pages/mapView.module.scss";
import { ReactComponent as Filter } from "../assets/filter.svg";

const types = ["전세", "반전세", "월세"];
const rooms = ["원룸", "1.5룸", "투룸", "쓰리룸"];

const MapView = () => {
    const [checks, setChecks] = useState(Array(7).fill(0));

    const [deposit, setDeposit] = useState("");
    const [monthly, setMonthly] = useState([]);

    const handleCheckbox = (e, index) => {
        let newChecks = [...checks];
        newChecks[index] = e.target.checked;
        setChecks(newChecks);
    }

    const handleDeposit = (value) => {
        let str = "";
        for (let i=0; i<2; i++) {
            if (value[i] === 30000) {
                str += "무제한";
            } else if (value[i] > 9999) {
                str += Math.floor(value[i] / 10000) + "억" + value[i] % 10000 + "만 원";
            } else if (value[i] > 0) {
                str += value[i] + "만 원";
            } else {
                str += value[i] + "원";
            }

            if (value[0] === value[1]) { break; }
            if (i === 0) { str += " ~ "; }
        }
        setDeposit(str);
    }

    const handleMonthly = (value) => {
        let str = "";
        for (let i=0; i<2; i++) {
            if (value[i] === 100) {
                str += "무제한";
            } else if (value[i] !== 0) {
                str += value[i] + "만 원";
            } else {
                str += value[i] + "원";
            }

            if (value[0] === value[1]) { break; }
            if (i === 0) { str += " ~ "; }
        }

        setMonthly(str);
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.searchDiv}>
                    <SearchBox type="long" />
                    <article className={styles.filters}>
                        <section className={`${styles.filter} ${styles.checkOpt} ${styles.first}`}>
                            <p className={styles.title}>계약 형태</p>
                            <article>
                                {types.map((v, i) => (
                                    <Fragment key={i}>
                                        <input type="checkbox" id={v} onChange={(e) => handleCheckbox(e, i)} />
                                        <label className={checks[i] && styles.active} htmlFor={v}>{v}</label>
                                    </Fragment>
                                ))}
                            </article>
                        </section>
                        <section className={`${styles.filter} ${styles.checkOpt} ${styles.second}`}>
                            <p className={styles.title}>방 수</p>
                            <article>
                                {rooms.map((v, i) => (
                                    <Fragment key={i}>
                                        <input type="checkbox" id={v} onChange={(e) => handleCheckbox(e, i+3)} />
                                        <label className={checks[i+3] && styles.active} htmlFor={v}>{v}</label>
                                    </Fragment>
                                ))}
                            </article>
                        </section>
                        <section className={`${styles.filter} ${styles.rangeOpt}`}>
                            <p className={styles.title}>보증금</p>
                            <p className={styles.range}>{deposit}</p>
                            <CustomSlider
                                step={100}
                                min={0}
                                max={30000}
                                handleValue={handleDeposit}
                            />
                            <article className={styles.index}>
                                <p className={styles.start}>0</p>
                                <p className={styles.center}>1억5000만원</p>
                                <p className={styles.end}>무제한</p>
                            </article>
                        </section>
                        <section className={`${styles.filter} ${styles.rangeOpt}`}>
                            <p className={styles.title}>월세</p>
                            <p className={styles.range}>{monthly}</p>
                            <CustomSlider
                                step={10}
                                min={0}
                                max={100}
                                handleValue={handleMonthly}
                            />
                            <article className={styles.index}>
                                <p className={styles.start}>0</p>
                                <p className={styles.center}>50만원</p>
                                <p className={styles.end}>무제한</p>
                            </article>
                        </section>
                        <section className={`${styles.filter} ${styles.extraOpt}`}>
                            <Filter />
                            <p className={styles.extra}>추가 필터</p>
                        </section>
                    </article>
                </section>
                <section className={styles.mapDiv}>
                    <Map />
                </section>
            </div>
        </Layout>
    );
}

export default MapView;