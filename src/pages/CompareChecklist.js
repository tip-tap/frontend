import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import styles from "../styles/pages/compare.module.scss";
import Sortable from "../components/Sortable"


const headers = ["옵션","세부정보"]
const checkbasics = ["매물 위치","입주가능일","계약 형태",
"보증금","월세","관리비","해당층","평 수","방 수","내부 구조"]
const checkoptions = [
    "가스레인지","인덕션","전자레인지","냉장고","세탁기","에어컨",
    "인터넷","TV","와이파이","옷장","수납장","신발장","침대","책상","의자"
]
const checkdetails = ["곰팡이","누수","벌레","균열","방음","창문 크기",
"주실 방향","환풍기","통풍","외부 소음","수압","배수","온수"]


const CompareChecklist  = () => {

    const[isChecked, setIsChecked] = useState(Array(3).fill(false));
    const[whichChecked, setWhichChecked] = useState(Array(3).fill(0));
    const[isSwitch, setSwitch] = useState(false);
    const[position,setPosition] = useState(false);

    const[isFixed, setIsFixed] = useState(false);
    
    const basicsRef = useRef();
    const optionsRef = useRef();
    const detailsRef = useRef();

    const handleCheck = (e, i) => {
        let newChecks = [...isChecked];
        newChecks[i] = e.target.checked;
        setIsChecked(newChecks);

        let newChecksOrder = [...whichChecked];
        newChecksOrder[i] = i;
        setWhichChecked(newChecksOrder); 

        setSwitch(e.target.checked);
        setPosition(i);
    }

    const handleScroll = () =>{
       if(window.scrollY > 10){
        setIsFixed(true);
       }else{
        setIsFixed(false);
       }
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
    },[])

    useEffect(() =>{
        if(isSwitch===true){
            if(isChecked[0]===true && position===0){
                if(whichChecked[0]===0){
                    basicsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
                }
            }else if(isChecked[1]===true && position===1){
                if(whichChecked[1]===1){
                    optionsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
                }
            }else if(isChecked[2]===true && position===2){
                if(whichChecked[2]===2){
                    detailsRef.current?.scrollIntoView({behavior: "smooth", block:"center"});
                }
            }
        }     
    },[isChecked,whichChecked])


    return (
        <Layout withToggle={true} active={"none"}>
            <div className={`${styles.headwrapper} ${isFixed && styles.fixedHeader}`}>
                <span className={styles.infotitle}>보고싶은 정보들</span>
                <input type = "checkbox" id ={0} checked = {true} onClick ={(e)=> handleCheck(e,0) } ></input>
                <label id ={0}>{'기본정보'}</label>
                {headers.map((value,i) =>
                    <>
                        <input type = "checkbox" id ={i+1} onClick ={(e)=> handleCheck(e,i+1) } ></input>
                        <label id ={i+1}>{value}</label>
                    </>
                )}
                <CreateListBtn type = "secondary-m"/>
            </div>


            <div className={styles.listwrapper}>
                <div className={styles.listtitle}>
                    <div className={styles.wangbasics}>
                        <div className={styles.basics} ref = {basicsRef}>
                            {checkbasics.map((key, index) => (
                                <div className={styles.basicsContent}>
                                    {key}
                                </div>
                            ))}
                        </div>
                        <div className={styles.empty}></div>
                    </div>
            
                    <div className={isChecked[1] && whichChecked[1] ?styles.wangoptions:styles.none}>
                        <div className={styles.options} ref = {optionsRef}>
                            {checkoptions.map((key, index) => (
                                <div className={styles.optionsContent}>
                                    {key}
                                </div>
                            ))}
                        </div>
                        <div className={styles.empty}></div>
                    </div>
                    
                
                    <div className={isChecked[2] && whichChecked[2] ?styles.details:styles.none} ref = {detailsRef}>
                        {checkdetails.map((key, index) => (
                            <div className={styles.detailsContent}>
                                {key}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.checklistwrapper}>
                    <Sortable isChecked={isChecked} whichChecked={whichChecked}></Sortable>
                </div>
            </div>
        </Layout>
    );
}

export default CompareChecklist;