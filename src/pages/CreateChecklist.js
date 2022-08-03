import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";
import styles from "../styles/pages/createcl.module.scss";
import Layout from "../components/common/Layout";
import ImgUpload from '../components/ImgUpload';

const basics = [
    "매물 위치", "공인중개사", "입주가능일", "연락처",
    "계약 형태", "보증금", "월세", "관리비",
    "해당층", "평 수", "방 수", "내부 구조"
];

const options = [
    "가스레인지", "인덕션", "전자레인지", "냉장고",
    "세탁기", "에어컨", "인터넷", "TV",
    "와이파이", "옷장", "수납장", "신발장",
    "침대", "책상", "의자", "건조대"
];

const details = {
    "곰팡이": ["있다", "없다"],
    "누수": ["있다", "없다"],
    "벌레": ["있다", "없다"],
    "균열": ["있다", "없다"],
    "방음": ["상", "중", "하"],
    "창문 크기": ["크다", "보통이다", "작다"],
    "주실 방향": ["동향", "서향", "남향", "북향"],
    "환풍기": ["빠르다", "보통이다", "느리다"],
    "통풍": ["상", "중", "하"],
    "외부 소음": ["크다", "보통이다", "작다"],
    "수압": ["세다", "보통이다", "약하다"],
    "배수": ["세다", "보통이다", "약하다"],
    "온수": ["세다", "보통이다", "약하다"]
};

const CreateChecklist = () => {
    const { register, watch, handleSubmit, getValues } = useForm();

    const onSubmit = () => {

    }

    console.log(getValues());
    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className={styles.images}>
                        <ImgUpload></ImgUpload>
                    </section>

                    <p className={styles.subtitle}>기본 정보</p>
                    <section className={styles.basics}>
                        {basics.map((value, index) => (
                            <article key={index} className={styles.basicsItem}>
                                <div className={styles.basicsLabel}>
                                    {value}
                                </div>
                                <input type="text" {...register(value)} />      
                            </article>
                        ))}
                    </section>

                    <p className={styles.subtitle}>옵션</p>
                    <section className={styles.options}>
                        {options.map((value, index) => (
                            <article key={index} className={`${watch(value) && styles.active} ${styles.optionsItem}`}>
                                <input type="checkbox" id={value} {...register(value)} />
                                <label htmlFor={value}>{value}</label>
                            </article>
                        ))}
                    </section>

                    <p className={styles.subtitle}>세부 정보</p>
                    <section className={styles.details}>
                        {Object.keys(details).map((key, keyIdx) => (
                            <article key={keyIdx} className={styles.detailsItem}>
                                <p className={`${(watch(key) !== null && watch(key) !== undefined) && styles.active} ${styles.detailsKey}`}>{key}</p>
                                <div className={styles.choices}>
                                {
                                    details[key].map((value, valIdx) => (
                                        <Fragment key={valIdx}>
                                            <input type="radio" name={key} id={key + value} value={key + value} {...register(key)} />
                                            <label className={`${watch(key) === (key + value) && styles.active} ${styles.detailsValue}`} htmlFor={key + value}>{value}</label>
                                        </Fragment>
                                    ))
                                    
                                }
                                {
                                    (key === "수압" || key === "배수" || key === "온수") &&
                                    <div className={styles[`water-related`]}>
                                        <span>싱크대</span>
                                        <span>세면대</span>
                                        <span>샤워기</span>
                                        <span>양변기</span>
                                    </div>
                                }
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className={styles.buttons}>
                        <button className={`${styles.btn} ${styles.cancel}`}>취소</button>
                        <button className={`${styles.btn} ${styles.save}`}>저장</button>
                    </section>
                </form>
            </div>
        </Layout>
    );
}

export default CreateChecklist;