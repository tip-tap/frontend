import React, { Fragment, useState, useRef } from "react";
import CustomSlider from "../components/CustomSlider";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";
import styles from "../styles/components/searchBox.module.scss";

const types = ["전세", "반전세", "월세"];
const rooms = ["원룸", "1.5룸", "투룸", "쓰리룸"];
const { kakao } = window;

const SearchBox = ({ type, withFilter, setCenterLat, setCenterLng }) => {
    /* 검색창 자동완성 */
    const [showList, setShowList] = useState(false);
    const [timer, setTimer] = useState(null);
    const [list, setList] = useState([]);
    const [listError, setListError] = useState("");
    const [refIdx, setRefIdx] = useState(-1);
    const listRef = useRef(null);
    const inputRef = useRef(null);
    let places = new kakao.maps.services.Places();

    const onSearchCallback = (data, status, pagination) => {
        setList([]);
        setListError("");

        if (status === kakao.maps.services.Status.OK) {
            const listSet = new Set();
            for (let i=0; i<data.length; i++) {   
                listSet.add(data[i].road_address_name ? data[i].road_address_name : data[i].address_name);
            }
            setList(Array.from(listSet).slice(0, 5));
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            setListError("검색 결과가 존재하지 않습니다");
        } else if (status === kakao.maps.services.Status.ERROR) {
            setListError("검색 결과 중 오류가 발생했습니다");
        }
    }

    const confirmSearch = (address) => {
        inputRef.current.value = address;
        setRefIdx(-1);

        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setCenterLat(result[0].y);
                setCenterLng(result[0].x);
                setShowList(false);
            }
        }
        geocoder.addressSearch(address, callback);
    }

    const onSearch = (keyword) => {
        places.keywordSearch(keyword, onSearchCallback);
        setShowList(true);
    }

    const debouncedChange = (e) => {
        if (timer) { clearTimeout(timer); }
        setTimer(setTimeout(() => {
            if (e.target.value === "") {
                setShowList(false);
            }
            else {
                onSearch(e.target.value);
            }
        }, 500));
    }

    const handleKeyEvent = (e) => {
        if (e.key === "ArrowDown") {
            setRefIdx(refIdx+1);
        }else if (e.key === "ArrowUp") {
            setRefIdx(refIdx-1);
        } else if (e.key === "Enter") {
            if (refIdx >= 0 && refIdx <= 4) {
                e.target.value = list[refIdx];
                setRefIdx(-1);
                setShowList(false);
                confirmSearch(e.target.value);
            }
        }
    }
    /************/

    // 계약 형태 및 방 수 체크박스
    const [checks, setChecks] = useState(Array(7).fill(0));

    /* 보증금 및 월세 슬라이더 */
    const [deposit, setDeposit] = useState("");
    const [monthly, setMonthly] = useState([]);

    const handleCheckbox = (e, index) => {
        let newChecks = [...checks];
        newChecks[index] = e.target.checked;
        setChecks(newChecks);
        console.log(e.target.checked);
    }

    const handleDeposit = (value) => {
        let str = "";
        for (let i=0; i<2; i++) {
            if (value[i] <= 10) { // 100만 ~ 1000만 (100만 단위 10스텝)
                str += value[i] * 100 + "만 원";
            } else if (value[i] <= 34) { // 2000만 ~ 2억5천 (1000만 단위 24스텝)
                str += value[i] - 9 >= 10 ? Math.floor((value[i] - 9) / 10) + "억" : "";
                str += (value[i] - 9) % 10 * 1000 + "만 원";
            } else if (value[i] <= 47) { // 3억 ~ 9억 (5000만 단위 13스텝)
                str += value[i] % 2 ? (value[i] - 29) / 2 + "억" : (value[i] - 30) / 2 + "억";
                str += value[i] % 2 ? "" : "5000만 원";
            } else {
                str += "무제한";
            }

            if (value[0] === value[1]) { break; }
            if (i === 0) {str += " ~ "; }
        }
        setDeposit(str);
    }

    const handleMonthly = (value) => {
        let str = "";
        for (let i=0; i<2; i++) {
            if (value[i] <= 10) { // 5만 ~ 50만 (5만 단위 10스텝)
                str += value[i] * 5 + "만 원";
            } else if (value[i] <= 15) { // 60만 ~ 100만 (10만 단위 5스텝)
                str += (value[i] - 5) * 10 + "만 원";
            } else if (value[i] <= 19) { // 150만 ~ 300만 (50만 단위 4스텝)
                str += (value[i] - 13) * 50 + "만 원";
            } else {
                str += "무제한";
            }

            if (value[0] === value[1]) { break; }
            if (i === 0) { str += " ~ "; }
        }

        setMonthly(str);
    }
    /************/

    /* 추가 필터 */
    const [showExtra, setShowExtra] = useState(false);
    const [extraOptions, setExtraOptions] = useState({
        "가스레인지": 0, "인덕션": 0, "전자레인지": 0, "냉장고": 0,
        "세탁기": 0, "에어컨": 0, "인터넷": 0, "TV": 0,
        "와이파이": 0, "옷장": 0, "수납장": 0, "신발장": 0,
        "침대": 0, "책상": 0, "의자": 0, "건조대": 0
    });

    const handleExtra = (v) => {
        let newOptions = {...extraOptions};
        newOptions[v] ? newOptions[v] = 0 : newOptions[v] = 1;
        setExtraOptions(newOptions);
    }
    /************/

    return (
        <div className={`${styles.wrapper} ${type !== "mini" && styles.nonMiniWrapper}`}>
            <section className={`
                ${styles.box}
                ${type === "short" && styles.shortBox}
                ${type === "long" && styles.longBox}
                ${type === "mini" && styles.miniBox}
            `}>
                {type !== "mini" ? 
                <>
                    <Search width="48" height="48" /> 
                    <input placeholder="지역을 입력해주세요" onChange={debouncedChange} onKeyDown={handleKeyEvent} ref={inputRef} />
                </>
                :
                <>
                    <input placeholder="지역을 입력해주세요" onChange={debouncedChange} onKeyDown={handleKeyEvent} ref={inputRef} />
                    <Search width="18" height="18" /> 
                </>
                }
                {showList && 
                <div
                    className={`
                        ${styles.list}
                        ${type === "short" && styles.shortList}
                        ${type === "long" && styles.longList}
                        ${type === "mini" && styles.miniList}
                    `}
                    id="list"
                    ref={listRef}
                >
                    {listError !== "" ? 
                        <p>{listError}</p>
                    :
                        list.map((v, i) => (
                            <div key={i} className={refIdx === i && styles.focus} onClick={() => confirmSearch(v)}>
                                {v}
                            </div>
                        ))
                    }
                </div>
                }
            </section>
            
            {withFilter && 
                <section className={styles.filters}>
                    <article className={`${styles.filter} ${styles.checkOpt} ${styles.first}`}>
                        <p className={styles.title}>계약 형태</p>
                        <div>
                            {types.map((v, i) => (
                                <Fragment key={i}>
                                    <input type="checkbox" id={v} onChange={(e) => handleCheckbox(e, i)} />
                                    <label className={checks[i] && styles.active} htmlFor={v}>{v}</label>
                                </Fragment>
                            ))}
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.checkOpt} ${styles.second}`}>
                        <p className={styles.title}>방 수</p>
                        <div>
                            {rooms.map((v, i) => (
                                <Fragment key={i}>
                                    <input type="checkbox" id={v} onChange={(e) => handleCheckbox(e, i+3)} />
                                    <label className={checks[i+3] && styles.active} htmlFor={v}>{v}</label>
                                </Fragment>
                            ))}
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.rangeOpt}`}>
                        <p className={styles.title}>보증금</p>
                        <p className={styles.range}>{deposit}</p>
                        <CustomSlider
                            min={0}
                            max={48}
                            handleValue={handleDeposit}
                        />
                        <div className={styles.index}>
                            <p className={styles.start}>0</p>
                            <p className={styles.center}>1억5000만원</p>
                            <p className={styles.end}>무제한</p>
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.rangeOpt}`}>
                        <p className={styles.title}>월세</p>
                        <p className={styles.range}>{monthly}</p>
                        <CustomSlider
                            min={0}
                            max={20}
                            handleValue={handleMonthly}
                        />
                        <div className={styles.index}>
                            <p className={styles.start}>0</p>
                            <p className={styles.center}>50만원</p>
                            <p className={styles.end}>무제한</p>
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.extraOpt}`} onClick={() => setShowExtra(!showExtra)}>
                        <Filter />
                        <p className={styles.extra}>추가 필터</p>
                    </article>
                </section>
            }
            {showExtra &&
            <section className={styles.extraList}>
                <p>추가 필터</p>
                <div className={styles.extraGrid}>
                {Object.entries(extraOptions).map(([key, value]) => (
                    <div key={key} className={`${styles.extraItem} ${value && styles.on}`} onClick={() => handleExtra(key)}>
                        {key}
                    </div>
                ))}
                </div>
            </section>
            }
        </div>
    );
}

export default SearchBox;