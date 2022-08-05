import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import styles from "../styles/pages/compare.module.scss";
import Sortable from "../components/Sortable"


const headers = ["기본정보","옵션","세부정보"]
const checkbasics = ["매물 위치","입주가능일","계약 형태",
"보증금","월세","관리비","해당층","평 수","방 수","내부 구조"]
const checkoptions = [
    "가스레인지","인덕션","전자레인지","냉장고","세탁기","에어컨",
    "인터넷","TV","와이파이","옷장","수납장","신발장","침대","책상","의자"
]
const checkdetails = ["곰팡이","누수","벌레","균열","방음","창문 크기",
"주실 방향","환풍기","통풍","외부 소음","수압","배수","온수"]


const CompareChecklist  = () => {

    const[isChecked, setIsChecked] = useState(false);
    const[whichChecked, setWhichChecked] = useState(0);
    const basicsRef = useRef();
    const optionsRef = useRef();
    const detailsRef = useRef();

    const handleCheck = (checked, i) => { //ex: 2번째꺼 (세부정보) 체크했을때
        console.log(checked);  //true
        setWhichChecked(i); 
        setIsChecked(checked); 
        console.log(isChecked); //false -> 이부분이 이해가 안돼ㅠ 왜 true가 아닌거죠ㅠㅠ
        console.log(i); //2
        if(checked===true){
            if(i===0){
                basicsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
            } else if(i===1){
                optionsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
            }else{
                detailsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
            }
        }
    }

    return (
        <Layout withToggle={true} active={"none"}>
            <div className={styles.headwrapper}>
                <span className={styles.infotitle}>보고싶은 정보들</span>

                {headers.map((value,i) =>
                    <>
                        <input type = "checkbox" id ={i} onClick ={(e)=> handleCheck(e.target.checked,i) } ></input>
                        <label id ={i}>{value}</label>
                    </>
                )}


                <CreateListBtn type = "secondary-m"/>
            </div>


            <div className={styles.listwrapper}>
                <div className={styles.listtitle}>
                    <div className={styles.basics} ref = {basicsRef}>
                        {checkbasics.map((key, index) => (
                            <div className={styles.basicsContent}>
                                {key}
                            </div>
                        ))}
                    </div>
                    <div className={styles.empty}></div>
                    <div className={whichChecked?styles.options:styles.none} ref = {optionsRef}>
                        {checkoptions.map((key, index) => (
                            <div className={styles.optionsContent}>
                                {key}
                            </div>
                        ))}
                    </div>
                    <div className={styles.empty}></div>
                    <div className={whichChecked?styles.details:styles.none} ref = {detailsRef}>
                        {checkdetails.map((key, index) => (
                            <div className={styles.detailsContent}>
                                {key}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.checklistwrapper}>
                    <Sortable></Sortable>
                </div>
            </div>

        </Layout>
    );
}

export default CompareChecklist;