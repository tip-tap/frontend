import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/pages/createcl.module.scss";
import Layout from "../components/common/Layout";
import ImgUpload from '../components/ImgUpload';
import SearchBox from '../components/SearchBox';
import CustomSelect from '../components/CustomSelect';
import ConfirmModal from '../components/ConfirmModal';
import { DatePicker } from 'antd';
import axios from "axios";

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

    const postChecklist = async () => {
        /* API TEST */
        console.log(images);
        // 체크리스트 저장 (방법 1) SUCCESS ✅
        // multiple images post?! 🤔
        await axios.post("http://localhost:8000/api/v1/checklist/", {
                roomInfo: {
                    "basicInfo_location_x": 33.450701,
                    "basicInfo_location_y": 126.570667,
                    "basicInfo_brokerAgency": "안녕부동산",
                    "basicInfo_move_in_date": "문의조정가능",
                    "basicInfo_brokerAgency_contact": "010-3849-8829",
                    "basicInfo_room_type": "J",
                    "basicInfo_deposit":  10000000,
                    "basicInfo_monthly_rent": 500000,
                    "basicInfo_maintenance_fee": 1,
                    "basicInfo_floor": 1,
                    "basicInfo_area": 8,
                    "basicInfo_number_of_rooms": 1.5,
                    "basicInfo_interior_structure": "L",
                    "option_gas_stove": false,
                    "option_induction": false,
                    "option_microwave": false,
                    "option_refrigerator": false,
                    "option_washing_machine": false,
                    "option_air_conditioner": false,
                    "option_internet": false,
                    "option_tv": false,
                    "option_wifi": false,
                    "option_closet": false,
                    "option_cabinet": false,
                    "option_shoe_rack": false,
                    "option_bed": false,
                    "option_desk": false,
                    "option_chair": false,
                    "option_drying_rack": false,
                    "detailInfo_is_moldy": false,
                    "detailInfo_is_leak": false,
                    "detailInfo_is_bug": false,
                    "detailInfo_is_crack": false,
                    "detailInfo_soundproof": "A",
                    "detailInfo_window_size": "L",
                    "detailInfo_main_direction": "E",
                    "detailInfo_ventilator": "S",
                    "detailInfo_ventilation": "B",
                    "detailInfo_external_noise": "L",
                    "detailInfo_water_pressure": "W",
                    "detailInfo_drainage": "S",
                    "detailInfo_hot_water": "S"
                },
                room: null,
                image: images[0]
            }
            , {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        /*
        // 체크리스트 저장 (방법 2) SUCCESS ✅
        await axios.post("http://localhost:8000/api/v1/checklist/", {
            roomInfo: {
                "basicInfo_location_x": 33.450701,
                "basicInfo_location_y": 126.570667,
                "basicInfo_brokerAgency": "안녕부동산",
                "basicInfo_move_in_date": "문의조정가능",
                "basicInfo_brokerAgency_contact": "010-3849-8829",
                "basicInfo_room_type": "J",
                "basicInfo_deposit":  10000000,
                "basicInfo_monthly_rent": 500000,
                "basicInfo_maintenance_fee": 1,
                "basicInfo_floor": 1,
                "basicInfo_area": 8,
                "basicInfo_number_of_rooms": 1.5,
                "basicInfo_interior_structure": "L",
                "option_gas_stove": false,
                "option_induction": false,
                "option_microwave": false,
                "option_refrigerator": false,
                "option_washing_machine": false,
                "option_air_conditioner": false,
                "option_internet": false,
                "option_tv": false,
                "option_wifi": false,
                "option_closet": false,
                "option_cabinet": false,
                "option_shoe_rack": false,
                "option_bed": false,
                "option_desk": false,
                "option_chair": false,
                "option_drying_rack": false,
                "detailInfo_is_moldy": false,
                "detailInfo_is_leak": false,
                "detailInfo_is_bug": false,
                "detailInfo_is_crack": false,
                "detailInfo_soundproof": "A",
                "detailInfo_window_size": "L",
                "detailInfo_main_direction": "E",
                "detailInfo_ventilator": "S",
                "detailInfo_ventilation": "B",
                "detailInfo_external_noise": "L",
                "detailInfo_water_pressure": "W",
                "detailInfo_drainage": "S",
                "detailInfo_hot_water": "S"
            },
            room: null,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        */
    }

    const putChecklist = async () => {
        const checklist_id = 2; // dummy
        
        // 체크리스트 수정 SUCCESS ✅
        // cf. room 및 images 필드 변경 불가
        await axios.put(`http://localhost:8000/api/v1/checklist/${checklist_id}/`, {
            roomInfo: {
                "basicInfo_location_x": 33.450701,
                "basicInfo_location_y": 126.570667,
                "basicInfo_brokerAgency": "하이부동산",
                "basicInfo_move_in_date": "문의조정가능",
                "basicInfo_brokerAgency_contact": "010-3849-8829",
                "basicInfo_room_type": "J",
                "basicInfo_deposit":  10000000,
                "basicInfo_monthly_rent": 500000,
                "basicInfo_maintenance_fee": 1,
                "basicInfo_floor": 1,
                "basicInfo_area": 8,
                "basicInfo_number_of_rooms": 1.5,
                "basicInfo_interior_structure": "L",
                "option_gas_stove": false,
                "option_induction": false,
                "option_microwave": false,
                "option_refrigerator": false,
                "option_washing_machine": false,
                "option_air_conditioner": false,
                "option_internet": false,
                "option_tv": false,
                "option_wifi": false,
                "option_closet": false,
                "option_cabinet": false,
                "option_shoe_rack": false,
                "option_bed": false,
                "option_desk": false,
                "option_chair": false,
                "option_drying_rack": false,
                "detailInfo_is_moldy": false,
                "detailInfo_is_leak": false,
                "detailInfo_is_bug": false,
                "detailInfo_is_crack": false,
                "detailInfo_soundproof": "A",
                "detailInfo_window_size": "L",
                "detailInfo_main_direction": "E",
                "detailInfo_ventilator": "S",
                "detailInfo_ventilation": "B",
                "detailInfo_external_noise": "L",
                "detailInfo_water_pressure": "W",
                "detailInfo_drainage": "S",
                "detailInfo_hot_water": "S"
            }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const [images, setImages] = useState([]);

    const postImage = () => {
        const checklist_id = 2; // dummy

        images.forEach(async (v) => {
            // 이미지 추가 (체크리스트) SUCCESS ✅
            await axios.post("http://localhost:8000/api/v1/image/", {
            checklist_id,
            image: v
            }, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        })
    }

    const deleteImage = async () => {
        // 이미지 삭제 (체크리스트) 500 ERROR 🚨
        await axios.delete("http://localhost:8000/api/v1/image/", {
            image: ""
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    /************/

    const onSubmit = () => {
        postChecklist(); // api test
        // putChecklist(); // api test
        // postImage(); // api test
        // deleteImage(); // api test

        let isValid = true;
        const values = Object.values(getValues());
        const len = values.length;
        for (let i=0; i<len; i++) {
            if (values[i] === "" || values[i] === null || values[i] === undefined) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            setIsModalVisible(true);
        } 
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDeposit = (e) => {
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
        <>
            <Layout>
                <div className = {styles.wrapper}>
                    <button className={styles.confirm}>매물 확정하기</button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className={styles.images}>
                            <ImgUpload setImages={setImages} />
                        </section>

                        <p className={styles.subtitle}>기본 정보</p>
                        <section className={styles.basics}>
                            <article className={styles.basicsItem}>
                                <div className={styles.basicsLabel}>매물 위치</div>
                                <SearchBox type="mini" withFilter={false} />  
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
                                            disabled={watch("입주 가능일 옵션") === undefined || watch("입주 가능일 옵션") === "직접 입력" ? false : true}
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
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>월세</div>         
                                <Controller 
                                    control={control}
                                    name="월세"
                                    render={({field: { onChange }}) => (
                                        <CustomSelect
                                            defaultValue="0만원"
                                            options={[
                                                "0만원", "10만원", "15만원", "20만원", "25만원", "30만원", "35만원", "40만원", "45만원", "50만원",
                                                "55만원", "60만원", "65만원", "70만원", "75만원", "80만원", "85만원", "90만원", "95만원", "100만원"
                                            ]}
                                            withAdd={true}
                                            onChange={onChange}
                                        />  
                                    )}
                                />         
                            </article>
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>관리비</div>
                                    <Controller 
                                        control={control}
                                        name="관리비"
                                        render={({field: { onChange }}) => (
                                            <CustomSelect
                                                defaultValue="0만원"
                                                options={[
                                                    "0만원", "1만원", "2만원", "3만원", "4만원", "5만원", "6만원", "7만원", "8만원", "9만원", "10만원",
                                                    "11만원", "12만원", "13만원", "14만원", "15만원", "16만원", "17만원", "18만원", "19만원", "20만원",
                                                    "21만원", "22만원", "23만원", "24만원", "25만원", "26만원", "27만원", "28만원", "29만원", "30만원",
                                                ]}
                                                withAdd={true}
                                                onChange={onChange}
                                            />   
                                        )}
                                    />
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
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>평 수</div>  
                                    <Controller 
                                        control={control}
                                        name="평 수"
                                        render={({field: { onChange }}) => (
                                            <CustomSelect
                                                defaultValue="0원"
                                                options={[
                                                    "0평", "1평", "2평", "3평", "4평", "5평", "6평", "7평", "8평", "9평", "10평",
                                                    "11평", "12평", "13평", "14평", "15평", "16평", "17평", "18평", "19평", "20평"
                                                ]}
                                                withAdd={true}
                                                onChange={onChange}
                                            />    
                                        )}
                                    />               
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
                            <button type="button" className={`${styles.btn} ${styles.cancel}`}>취소</button>
                            <button type="submit" className={`${styles.btn} ${styles.save}`}>저장</button>
                        </section>
                    </form>
                </div>
            </Layout>
            <ConfirmModal
                title="입력되지 않은 항목이 있습니다"
                content="그래도 저장하시겠습니까?"
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    );
}

export default CreateChecklist;