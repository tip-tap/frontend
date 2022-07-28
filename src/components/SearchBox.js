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
        console.log("here");
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
        console.log(e);
        if (e.key === "ArrowDown") {
            setRefIdx(refIdx+1);
        } else if (e.key === "ArrowUp") {
            setRefIdx(refIdx-1);
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
        <div className={styles.wrapper}>
            <section className={`
                ${styles.box}
                ${type === "short" && styles.shortBox}
                ${type === "long" && styles.longBox}
            `}>
                <Search />
                <input placeholder="지역을 입력해주세요" onChange={debouncedChange} onKeyDown={handleKeyEvent}/>
                {showList && 
                <div
                    className={`
                        ${styles.list}
                        ${type === "short" && styles.shortList}
                        ${type === "long" && styles.longList}
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
                            step={100}
                            min={0}
                            max={30000}
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
                            step={10}
                            min={0}
                            max={100}
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