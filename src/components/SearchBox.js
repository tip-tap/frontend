import React, { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomSlider from "../components/CustomSlider";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";
import styles from "../styles/components/searchBox.module.scss";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { centerPosState, searchInputState, checksState, depositStrState, monthlyStrState, depositNumState, monthlyNumState, depositValueState, monthlyValueState, extraOptionsState, defaultRoomsState } from "../_recoil/state";
import { useSnackbar } from "notistack";
import { types, rooms } from "../attributes/checks";

const { kakao } = window;

const SearchBox = ({ type, withFilter, searchToggle, setSearchToggle }) => {
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();
    const navigate = useNavigate();

    // 지도 중심좌표
    const setCenterPos = useSetRecoilState(centerPosState);
    
    /* 검색창 자동완성 */
    const [searchInput, setSearchInput] = useRecoilState(searchInputState);
    const setDefaultRooms = useSetRecoilState(defaultRoomsState);

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
        setDefaultRooms([]);
        setSearchInput(address);
        setRefIdx(-1);
        setShowList(false);

        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setCenterPos({centerLat: result[0].y, centerLng: result[0].x});
                if (searchToggle) {
                    setSearchToggle(!searchToggle);
                }
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                enqueueSnackbar("검색 결과가 존재하지 않습니다", {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    autoHideDuration: 2000,
                    sx: {
                        "& .SnackbarContent-root": {
                            bgcolor: "#0040BD"
                        }
                    }
                });
                inputRef.current.value = "";
            }
        }
        geocoder.addressSearch(address, callback);

        if (type === "long" || type === "short") {
            navigate("/map");   
        }
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
            e.preventDefault();
            if (refIdx >= 0 && refIdx <= 4) {
                e.target.value = list[refIdx];
            } 
            setShowList(false);
            confirmSearch(e.target.value);
        }
    }
    /************/

    // 계약 형태 및 방 수 체크박스
    const [checks, setChecks] = useRecoilState(checksState);

    /* 보증금 및 월세 슬라이더 */
    const [depositStr, setDepositStr] = useRecoilState(depositStrState);
    const [monthlyStr, setMonthlyStr] = useRecoilState(monthlyStrState);
    
    const depositNum = useRecoilValue(depositNumState);
    //depositNum.min
    //depositNum.max
    const setDepositNum = useSetRecoilState(depositNumState);
    const setMonthlyNum = useSetRecoilState(monthlyNumState);
    const setDepositValue = useSetRecoilState(depositValueState);
    const setMonthlyValue = useSetRecoilState(monthlyValueState);

    const handleCheckbox = (e, index) => {
        let newChecks = [...checks];
        newChecks[index] = e.target.checked;
        setChecks(newChecks);
    }

    const handleDeposit = (value) => {
        setDepositValue(value);

        let str = "";
        const newDepositNum = { max: 0, min: 0 };
        for (let i=0; i<2; i++) {
            let num = 0;
            if (value[i] <= 10) { // 100만 ~ 1000만 (100만 단위 10스텝)
                str += value[i] * 100 + "만 원";
                num += value[i] * 1000000;
            } else if (value[i] <= 34) { // 2000만 ~ 2억5천 (1000만 단위 24스텝)
                str += value[i] - 9 >= 10 ? Math.floor((value[i] - 9) / 10) + "억" : "";
                str += (value[i] - 9) % 10 === 0 ? "" : (value[i] - 9) % 10 * 1000 + "만 원";
                num += value[i] - 9 >= 10 ? Math.floor((value[i] - 9) / 10) * 100000000 : 0;
                num += (value[i] - 9) % 10 * 10000000;
            } else if (value[i] <= 47) { // 3억 ~ 9억 (5000만 단위 13스텝)
                str += value[i] % 2 ? (value[i] - 29) / 2 + "억" : (value[i] - 30) / 2 + "억";
                str += value[i] % 2 ? "" : "5000만 원";
                num += value[i] % 2 ? (value[i] - 29) / 2 * 100000000 : (value[i] - 30) / 2 * 100000000;
                num += value[i] % 2 ? 0 : 50000000;
            } else {
                str += "무제한";
                num += 1000000000;
            }

            if (value[0] === value[1]) {
                newDepositNum.max = num;
                newDepositNum.min = num;
                break;
            }
            if (i === 0) {
                str += " ~ ";
                newDepositNum.min = num;
            }
            else if (i === 1) {
                newDepositNum.max = num;
            }
        }
        
        if (timer) { clearTimeout(timer); }
        setTimer(setTimeout(() => {
            setDepositNum(newDepositNum);
        }, 1000));

        setDepositStr(str);
    }
    
    const handleMonthly = (value) => {
        setMonthlyValue(value);
        
        let str = "";
        const newMonthlyNum = { max: 0, min: 0 };
        for (let i=0; i<2; i++) {
            let num = 0;
            if (value[i] <= 10) { // 5만 ~ 50만 (5만 단위 10스텝)
                str += value[i] * 5 + "만 원";
                num += value[i] * 5 * 10000;
            } else if (value[i] <= 15) { // 60만 ~ 100만 (10만 단위 5스텝)
                str += (value[i] - 5) * 10 + "만 원";
                num += (value[i] - 5) * 100000;
            } else if (value[i] <= 19) { // 150만 ~ 300만 (50만 단위 4스텝)
                str += (value[i] - 13) * 50 + "만 원";
                num += (value[i] - 13) * 500000;
            } else {
                str += "무제한";
                num += 10000000;
            }

            if (value[0] === value[1]) {
                newMonthlyNum.max = num;
                newMonthlyNum.min = num;
                break;
            }
            if (i === 0) {
                str += " ~ "; 
                newMonthlyNum.min = num;
            }
            else if (i === 1) {
                newMonthlyNum.max = num;
            }
        }
        
        if (timer) { clearTimeout(timer); }
        setTimer(setTimeout(() => {
            setMonthlyNum(newMonthlyNum);
        }, 1000));
        
        setMonthlyStr(str);
    }
    
    /************/

    /* 추가 필터 */
    const [showExtra, setShowExtra] = useState(false);
    const [extraOptions, setExtraOptions] = useRecoilState(extraOptionsState);

    const handleExtra = (v) => {
        let newOptions = {...extraOptions};
        newOptions[v] ? newOptions[v] = 0 : newOptions[v] = 1;
        setExtraOptions(newOptions);
    }
    /************/

    useEffect(() => {
        if ((type === "mini edit" || type === "mini open" || type === "long") && searchInput !== "") {
            inputRef.current.value = searchInput;
        }
    }, [type, searchInput]);

    return (
        <div className={`${styles.wrapper} ${type.slice(0, 4) !== "mini" && styles.nonMiniWrapper}`}>
            <section className={`
                ${styles.box}
                ${type === "short" && styles.shortBox}
                ${type === "long" && styles.longBox}
                ${type.slice(0, 4) === "mini" && styles.miniBox}
            `}>
                {type.slice(0, 4) !== "mini" ? 
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
                        ${type.slice(0, 4) === "mini" && styles.miniList}
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
                                <Fragment key={`type filter - ${i}`}>
                                    <input type="checkbox" id={v} checked={checks[i]} onChange={(e) => handleCheckbox(e, i)} />
                                    <label className={checks[i] && styles.active} htmlFor={v}>{v}</label>
                                </Fragment>
                            ))}
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.checkOpt} ${styles.second}`}>
                        <p className={styles.title}>방 수</p>
                        <div>
                            {rooms.map((v, i) => (
                                <Fragment key={`room filter - ${i}`}>
                                    <input type="checkbox" id={v} checked={checks[i+3]} onChange={(e) => handleCheckbox(e, i+3)} />
                                    <label className={checks[i+3] && styles.active} htmlFor={v}>{v}</label>
                                </Fragment>
                            ))}
                        </div>
                    </article>
                    <article className={`${styles.filter} ${styles.rangeOpt}`}>
                        <p className={styles.title}>보증금</p>
                        <p className={styles.range}>{depositStr}</p>
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
                        <p className={styles.range}>{monthlyStr}</p>
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