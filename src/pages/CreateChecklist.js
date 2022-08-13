import React, { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { useForm, Controller} from "react-hook-form";
import { useParams } from "react-router-dom";
import styles from "../styles/pages/createcl.module.scss";
import Layout from "../components/common/Layout";
import ImgUpload from '../components/ImgUpload';
import SearchBox from '../components/SearchBox';
import CustomSelect from '../components/CustomSelect';
import ConfirmModal from '../components/ConfirmModal';
import { DatePicker } from 'antd';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { centerPosState, searchInputState } from "../_recoil/state";
import axios from "axios";
import { optionsKR, optionsEN } from '../attributes/options';
import { detailsObj, detailsKR, detailsEN } from '../attributes/details';
import { basicsFEtoBE, basicsBEtoFE, detailsFEtoBE, detailsBEtoFE } from '../attributes/converter';
import moment from "moment";

const { kakao } = window;

const CreateChecklist = ({ type }) => {
    const params = useParams();
    const { register, watch, handleSubmit, getValues, setValue, control } = useForm();
    const { centerLat, centerLng } = useRecoilValue(centerPosState);
    const setCenterPos = useSetRecoilState(centerPosState);
    const setSearchInput = useSetRecoilState(searchInputState);
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [images, setImages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const depositRef = useRef();

    // 이미지 추가 POST
    const postImage = async (checklist_id, image) => {
        await axios.post("http://localhost:8000/api/v1/image/", { checklist_id, image }, { headers: { "Content-Type": "multipart/form-data" }})
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    
    // 체크리스트 생성 POST
    const postChecklist = async (data) => {        
        await axios.post("http://localhost:8000/api/v1/checklist/", data)
        .then((res) => {
            console.log(res);

            const { data: { data: { checklist_id }} } = res;
            images.forEach((image) => postImage(checklist_id, image));
        })
        .catch((err) => console.log(err))
    }

    // 체크리스트 수정 PUT
    const putChecklist = async (checklist_id, data) => {
        await axios.put(`http://localhost:8000/api/v1/checklist/${checklist_id}/`, data)
        .then((res) => {
            console.log(res);

            if (images.length !== 0) {
                images.forEach((image) => postImage(checklist_id, image));
            }
        })
        .catch((err) => console.log(err))
    }

    // 최종 제출
    const onSubmit = () => {
        // 기본 정보를 포함한 roomInfo
        const roomInfo = {
            "basicInfo_location_x": Number(Number(centerLat).toFixed(7)) || null,
            "basicInfo_location_y": Number(Number(centerLng).toFixed(7)) || null,
            "basicInfo_brokerAgency": watch("공인중개사") || null,
            "basicInfo_move_in_date": watch("입주 가능일 날짜") || watch("입주 가능일 옵션") || null,
            "basicInfo_brokerAgency_contact": watch("연락처") || null,
            "basicInfo_room_type": basicsFEtoBE[watch("계약 형태")] || null,
            "basicInfo_deposit":  Number(watch("보증금")) * 10000,
            "basicInfo_monthly_rent": watch("월세") ? Number(watch("월세").slice(0, -2)) * 10000 : null,
            "basicInfo_maintenance_fee": watch("관리비") ? Number(watch("관리비").slice(0, -2)) * 10000 : null,
            "basicInfo_floor": watch("해당층") ? Number(watch("해당층").slice(0, -1)) : null,
            "basicInfo_area": watch("평 수") ? Number(watch("평 수").slice(0, -1)) : null,
            "basicInfo_number_of_rooms": basicsFEtoBE[watch("방 수")] || null,
            "basicInfo_interior_structure": basicsFEtoBE[watch("내부 구조")] || null,
        };

        // roomInfo에 옵션 추가
        optionsEN.forEach((option, idx) => roomInfo[option] = watch(optionsKR[idx]));

        // roomInfo에 세부 정보 추가
        for (let i=0; i<4; i++) {
            roomInfo[detailsEN[i]] = watch(detailsKR[i]) ? (watch(detailsKR[i]).slice(detailsKR[i].length) === "있다" ? true : false) : null;
        }
        for (let i=4; i<13; i++) {
            roomInfo[detailsEN[i]] = watch(detailsKR[i]) ? detailsFEtoBE[detailsEN[i]][watch(detailsKR[i]).slice(detailsKR[i].length)] : null;
        }

        if (type === "create") { postChecklist({ room: null, roomInfo }); }
        else { putChecklist(params.id, { checklist_id: Number(params.id), roomInfo }); }
    }

    // 유효성 검사
    const onValidate = () => {
        let isValid = true;
        const values = Object.values(getValues());
        const len = values.length - 1;
        for (let i=0; i<len; i++) {
            if (values[i] === "" || values[i] === null || values[i] === undefined) {
                isValid = false;
                break;
            }
        }

        if (!isValid) { setIsModalVisible(true); }
        else { onSubmit(); }
    }

    // 보증금 디스플레이 포맷팅
    const handleDeposit = (deposit) => {
        if (typeof deposit !== "string") { deposit = String(deposit); }

        if (deposit.includes("억")) {
            const idx = deposit.indexOf("억");
            const curValue = parseInt(deposit.substr(0, idx) + deposit.substr(idx+2));
            if (curValue < 10000) { // 값이 억 미만으로 떨어진 경우
                depositRef.current.value = curValue;
            }
            else { // 값이 여전이 억 이상인 경우
                if (curValue >= 99999999) { return; }
                depositRef.current.value = Math.floor(curValue / 10000) + "억 " + (curValue % 10000 === 0 ? "0000" : curValue % 10000);
            }
        }
        else if (parseInt(deposit) >= 10000) { // 값이 억 이상으로 오른 경우
            const curValue = parseInt(deposit);
            depositRef.current.value = Math.floor(curValue / 10000) + "억 " + (curValue % 10000 === 0 ? "0000" : curValue % 10000);
        }
    }

    // 체크리스트 한 개 조회 GET (for edit mode)
    const getOneChecklist = useCallback (async (checklist_id) => {
        await axios.get(`http://localhost:8000/api/v1/checklist/${checklist_id}/`)
        .then((res) => {
            console.log(res);
            const fileList = res.data.images;
            const roomInfo = res.data.roomInfo;

            // 이미지
            setDefaultFileList(fileList.map((url, idx) => {
                return {
                    uid: idx.toString(),
                    name: url.slice(url.lastIndexOf('/') + 1),
                    status: "done",
                    url: `http://localhost:8000${url}`
                };
            }));

            // 기본 정보
            setCenterPos({
                centerLat: roomInfo.basicInfo_location_x,
                centerLng: roomInfo.basicInfo_location_y,
            })
            let geocoder = new kakao.maps.services.Geocoder();
            let coord = new kakao.maps.LatLng(Number(roomInfo.basicInfo_location_x), Number(roomInfo.basicInfo_location_y));
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    setSearchInput(result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name);
                }
            }
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
            setValue("공인중개사", roomInfo.basicInfo_brokerAgency);
            if (roomInfo.basicInfo_move_in_date === "문의조정가능" || roomInfo.basicInfo_move_in_date === "바로입주가능") {
                setValue("입주 가능일 옵션", roomInfo.basicInfo_move_in_date);
            }
            else {
                setValue("입주 가능일 옵션", "직접 입력");
                setValue("입주 가능일 날짜", roomInfo.basicInfo_move_in_date ? moment(roomInfo.basicInfo_move_in_date) : null);
            }            
            setValue("연락처", roomInfo.basicInfo_brokerAgency_contact);
            setValue("계약 형태", basicsBEtoFE[roomInfo.basicInfo_room_type]);
            setValue("보증금", handleDeposit(roomInfo.basicInfo_deposit));
            setValue("월세", roomInfo.basicInfo_monthly_rent ? roomInfo.basicInfo_monthly_rent / 10000 + "만원" : "0만원");
            setValue("관리비", roomInfo.basicInfo_maintenance_fee ? roomInfo.basicInfo_maintenance_fee / 10000 + "만원" : "0만원");
            setValue("해당층", roomInfo.basicInfo_floor ? roomInfo.basicInfo_floor + "층" : "0층");
            setValue("평 수", roomInfo.basicInfo_area ? roomInfo.basicInfo_area + "평" : "0평");
            setValue("방 수", basicsBEtoFE[roomInfo.basicInfo_number_of_rooms]);
            setValue("내부 구조", roomInfo.basicInfo_interior_structure ? basicsBEtoFE[roomInfo.basicInfo_interior_structure] : "-");
                        
            // 옵션
            optionsKR.forEach((option, index) => {
                setValue(option, roomInfo[optionsEN[index]]);
            });

            // 세부 정보
            for (let i=0; i<4; i++) {
                const value = roomInfo[detailsEN[i]];
                setValue(detailsKR[i], value !== null ? (value === true ? detailsKR[i] + "있다" : detailsKR[i] + "없다") : null);
            }

            for (let i=4; i<13; i++) {
                const value = roomInfo[detailsEN[i]];
                setValue(detailsKR[i], value !== null ? detailsKR[i] + detailsBEtoFE[detailsEN[i]][value] : null);
            }
        })
        .catch((err) => console.log(err))
    }, [setValue, setSearchInput, setCenterPos]);

    useEffect(() => {
        if (type === "edit") {
            const checklist_id = params.id;
            getOneChecklist(checklist_id);
        }
    }, [type, params.id, getOneChecklist]);

    /* API TEST
    const deleteImage = async () => {
        // 이미지 삭제 (체크리스트) SUCCESS ✅
        await axios({
            method: "delete",
            url: "http://localhost:8000/api/v1/image/",
            data: {
                image: "/media/image/8/a74be9d8821d4d899cf7612e2e40e351.jpg"
            }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const confirmChecklist = async () => {
        await axios({
            method: "post",
            url: "http://localhost:8000/api/v1/confirm/",
            data: {
                checklist_id: 2, // dummy
            }
        })
        await axios.post("http://localhost:8000/api/v1/confirm/", {
            checklist_id: 1
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    */

    return(
        <>
            <Layout>
                <div className = {styles.wrapper}>
                    <button className={styles.confirm}>매물 확정하기</button>
                    <form onSubmit={handleSubmit(onValidate)}>
                        <section className={styles.images}>
                            <ImgUpload type={type} setImages={setImages} defaultFileList={defaultFileList} />
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
                                    render={({field: { onChange, value }}) => (
                                        <DatePicker
                                            format={"YYYY-MM-DD"}
                                            style={{ width: "100%", padding: "0px"}} 
                                            bordered={false}
                                            placeholder="입력해주세요"
                                            onChange={(_, dateString) => {
                                                onChange(moment(dateString));
                                            }}
                                            value={value}
                                            disabled={watch("입주 가능일 옵션") === undefined || watch("입주 가능일 옵션") === "직접 입력" ? false : true}
                                        />
                                    )}
                                />
                                <Controller 
                                    control={control}
                                    name="입주 가능일 옵션"
                                    render={({field: { onChange, value }}) => (
                                        <CustomSelect
                                            defaultValue="직접 입력"
                                            options={["직접 입력", "문의조정가능", "바로입주가능"]}
                                            withAdd={false}
                                            onChange={onChange}
                                            value={value}
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
                                    <input type="text" placeholder="0" {...register("보증금", { onChange: (e) => handleDeposit(e.target.value) })} ref={depositRef} />      
                                    <label className={styles.unit}>만원</label>
                                </div>
                            </article>
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>월세</div>         
                                <Controller 
                                    control={control}
                                    name="월세"
                                    render={({field: { onChange, value }}) => (
                                        <CustomSelect
                                            defaultValue="0만원"
                                            options={[
                                                "0만원", "10만원", "15만원", "20만원", "25만원", "30만원", "35만원", "40만원", "45만원", "50만원",
                                                "55만원", "60만원", "65만원", "70만원", "75만원", "80만원", "85만원", "90만원", "95만원", "100만원"
                                            ]}
                                            withAdd={true}
                                            onChange={onChange}
                                            value={value}
                                        />  
                                    )}
                                />         
                            </article>
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>관리비</div>
                                    <Controller 
                                        control={control}
                                        name="관리비"
                                        render={({field: { onChange, value }}) => (
                                            <CustomSelect
                                                defaultValue="0만원"
                                                options={[
                                                    "0만원", "1만원", "2만원", "3만원", "4만원", "5만원", "6만원", "7만원", "8만원", "9만원", "10만원",
                                                    "11만원", "12만원", "13만원", "14만원", "15만원", "16만원", "17만원", "18만원", "19만원", "20만원",
                                                    "21만원", "22만원", "23만원", "24만원", "25만원", "26만원", "27만원", "28만원", "29만원", "30만원",
                                                ]}
                                                withAdd={true}
                                                onChange={onChange}
                                                value={value}
                                            />   
                                        )}
                                    />
                            </article>

                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>해당층</div>
                                <Controller 
                                    control={control}
                                    name="해당층"
                                    render={({field: { onChange, value }}) => (
                                        <CustomSelect
                                            defaultValue="0층"
                                            options={["1층", "2층", "3층", "4층", "5층", "6층", "7층"]}
                                            withAdd={true}
                                            onChange={onChange}
                                            value={value}
                                        />    
                                    )}
                                />
                            </article>
                            <article className={`${styles.basicsItem} ${styles.selectCenter}`}>
                                <div className={styles.basicsLabel}>평 수</div>  
                                    <Controller 
                                        control={control}
                                        name="평 수"
                                        render={({field: { onChange, value }}) => (
                                            <CustomSelect
                                                defaultValue="0평"
                                                options={[
                                                    "0평", "1평", "2평", "3평", "4평", "5평", "6평", "7평", "8평", "9평", "10평",
                                                    "11평", "12평", "13평", "14평", "15평", "16평", "17평", "18평", "19평", "20평"
                                                ]}
                                                withAdd={true}
                                                onChange={onChange}
                                                value={value}
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
                                    render={({field: { onChange, value }}) => (
                                        <CustomSelect
                                            defaultValue="-"
                                            options={["오픈형", "주방분리형", "베란다분리형", "주방베란다분리형", "복층형"]}
                                            withAdd={false}
                                            onChange={onChange}
                                            value={value}
                                        />    
                                    )}
                                />
                            </article>
                        </section>

                        <p className={styles.subtitle}>옵션</p>
                        <section className={styles.options}>
                            {optionsKR.map((value, index) => (
                                <article key={index} className={`${watch(value) && styles.active} ${styles.optionsItem}`}>
                                    <input type="checkbox" id={value} {...register(value)} />
                                    <label htmlFor={value}>{value}</label>
                                </article>
                            ))}
                        </section>

                        <p className={styles.subtitle}>세부 정보</p>
                        <section className={styles.details}>
                            {Object.keys(detailsObj).map((key, keyIdx) => (
                                <article key={keyIdx} className={styles.detailsItem}>
                                    <p className={`${(watch(key) !== null && watch(key) !== undefined) && styles.active} ${styles.detailsKey}`}>{key}</p>
                                    <div className={styles.choices}>
                                    {
                                        detailsObj[key].map((value, valIdx) => (
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
                onSubmit={onSubmit}
            />
        </>
    );
}

export default CreateChecklist;