import React, { Fragment, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/pages/createcl.module.scss";
import Layout from "../components/common/Layout";
import ImgUpload from '../components/ImgUpload';
import SearchBox from '../components/SearchBox';
import CustomSelect from '../components/CustomSelect';
import CustomInputSlider from '../components/CustomInputSlider';
import { DatePicker } from 'antd';

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
    const { register, watch, handleSubmit, getValues, control } = useForm();

    const onSubmit = () => {

    }

    const [centerLat, setCenterLat] = useState(-1);
    const [centerLng, setCenterLng] = useState(-1);

    const handleDeposit = (e) => {
        console.log(e.target.value);
        if (e.target.value.includes("억")) {
            const idx = e.target.value.indexOf("억");
            const curValue = parseInt(e.target.value.substr(0, idx) + e.target.value.substr(idx+2));
            if (curValue < 10000) { // 값이 억 미만으로 떨어진 경우
                e.target.value = curValue;
            }
            else { // 값이 여전이 억 이상인 경우
                if (curValue >= 99999999) { return; }
                e.target.value = Math.floor(curValue / 10000) + "억 " + (curValue % 10000 === 0 ? "0000" : curValue % 10000);
            }
        }
        else if (parseInt(e.target.value) >= 10000) { // 값이 억 이상으로 오른 경우
            const curValue = parseInt(e.target.value);
            e.target.value = Math.floor(curValue / 10000) + "억 " + (curValue % 10000 === 0 ? "0000" : curValue % 10000);
        }
    }

    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <button className={styles.confirm}>매물 확정하기</button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className={styles.images}>
                        <ImgUpload />
                    </section>

                    <p className={styles.subtitle}>기본 정보</p>
                    <section className={styles.basics}>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>매물 위치</div>
                            <SearchBox type="mini" withFilter={false} setCenterLat={setCenterLat} setCenterLng={setCenterLng} />  
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>공인중개사</div>
                            <input type="text" placeholder="입력해주세요" {...register("공인중개사")} />      
                        </article>
                        <article className={`${styles.basicsItem} ${styles.selectEnd}`}>
                            <div className={styles.basicsLabel}>입주 가능일</div>
                            <Controller 
                                control={control}
                                name="입주 가능일 날짜"
                                render={({field: { onChange }}) => (
                                    <DatePicker
                                        style={{ width: "100%", padding: "0px"}} 
                                        bordered={false}
                                        placeholder="입력해주세요"
                                        onChange={(_, dateString) => {
                                            onChange(dateString);
                                        }}
                                    />
                                )}
                            />
                            <Controller 
                                control={control}
                                name="입주 가능일 옵션"
                                render={({field: { onChange }}) => (
                                    <CustomSelect
                                        defaultValue="직접 입력"
                                        options={["직접 입력", "문의조정가능", "바로입주가능"]}
                                        withAdd={false}
                                        onChange={onChange}
                                    />    
                                )}
                            />
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>연락처</div>
                            <input type="text" placeholder="입력해주세요" {...register("연락처")} />      
                        </article>

                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>계약 형태</div>
                            <div className={styles.choices}>
                                <input type="radio" name="계약 형태" id="전세" value="전세" {...register("계약 형태")} />
                                <label className={`${watch("계약 형태") === "전세" && styles.active} ${styles.detailsValue}`} htmlFor="전세">전세</label>
                                <input type="radio" name="계약 형태" id="반전세" value="반전세" {...register("계약 형태")} />
                                <label className={`${watch("계약 형태") === "반전세" && styles.active} ${styles.detailsValue}`} htmlFor="반전세">반전세</label>
                                <input type="radio" name="계약 형태" id="월세" value="월세" {...register("계약 형태")} />
                                <label className={`${watch("계약 형태") === "월세" && styles.active} ${styles.detailsValue}`} htmlFor="월세">월세</label>
                            </div>
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>보증금</div>
                            <div className={styles.withUnits}>
                                <input type="text" placeholder="0" {...register("보증금", { onChange: (e) => handleDeposit(e) })} />      
                                <label className={styles.unit}>만원</label>
                            </div>
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>월세</div>         
                            <div className={`${styles.withUnits} ${styles.withSlider}`}>
                            <Controller 
                                control={control}
                                name="월세"
                                render={({field: { onChange }}) => (
                                    <CustomInputSlider
                                        min={0}
                                        max={300}
                                        text="만원"
                                        onChange={onChange}
                                    />  
                                )}
                            />          
                            </div>
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>관리비</div>
                            <div className={`${styles.withUnits} ${styles.withSlider}`}>     
                                <Controller 
                                    control={control}
                                    name="관리비"
                                    render={({field: { onChange }}) => (
                                        <CustomInputSlider
                                            min={0}
                                            max={50}
                                            text="만원"
                                            onChange={onChange}
                                        />  
                                    )}
                                />
                            </div>
                        </article>

                        <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                            <div className={styles.basicsLabel}>해당층</div>
                            <Controller 
                                control={control}
                                name="해당층"
                                render={({field: { onChange }}) => (
                                    <CustomSelect
                                        defaultValue="1층"
                                        options={["1층", "2층", "3층", "4층", "5층", "6층", "7층이상", "반지층", "옥탑방"]}
                                        withAdd={true}
                                        onChange={onChange}
                                    />    
                                )}
                            />
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>평 수</div>
                            <div className={`${styles.withUnits} ${styles.withSlider}`}>      
                                <Controller 
                                    control={control}
                                    name="평 수"
                                    render={({field: { onChange }}) => (
                                        <CustomInputSlider
                                            min={0}
                                            max={50}
                                            text="평"
                                            onChange={onChange}
                                        />  
                                    )}
                                />                        
                            </div>   
                        </article>
                        <article className={styles.basicsItem}>
                            <div className={styles.basicsLabel}>방 수</div>
                            <div className={styles.choices}>
                                <input type="radio" name="방 수" id="원룸" value="원룸" {...register("방 수")} />
                                <label className={`${watch("방 수") === "원룸" && styles.active} ${styles.detailsValue}`} htmlFor="원룸">원룸</label>
                                <input type="radio" name="방 수" id="1.5룸" value="1.5룸" {...register("방 수")} />
                                <label className={`${watch("방 수") === "1.5룸" && styles.active} ${styles.detailsValue}`} htmlFor="1.5룸">1.5룸</label>
                                <input type="radio" name="방 수" id="투룸" value="투룸" {...register("방 수")} />
                                <label className={`${watch("방 수") === "투룸" && styles.active} ${styles.detailsValue}`} htmlFor="투룸">투룸</label>
                                <input type="radio" name="방 수" id="쓰리룸" value="쓰리룸" {...register("방 수")} />
                                <label className={`${watch("방 수") === "쓰리룸" && styles.active} ${styles.detailsValue}`} htmlFor="쓰리룸">쓰리룸</label>
                            </div>
                        </article>
                        <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                            <div className={styles.basicsLabel}>내부 구조</div>
                            <Controller 
                                control={control}
                                name="내부 구조"
                                render={({field: { onChange }}) => (
                                    <CustomSelect
                                        defaultValue="오픈형"
                                        options={["오픈형", "주방분리형", "베란다분리형", "주방베란다분리형", "복층형"]}
                                        withAdd={true}
                                        onChange={onChange}
                                    />    
                                )}
                            />
                        </article>
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