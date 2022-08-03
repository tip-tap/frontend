import React, { useState, useRef, useEffect, Component } from "react";
import Layout from "../components/common/Layout";
import CreateListBtn from "../components/CreateListBtn";
import Checklist from "../components/Checklist";
import styles from "../styles/pages/compare.module.scss";



const basics = "기본정보"
const options = "옵션"
const details = "세부정보"

const checkbasics = {
    "매물 위치": "서울특별시 성동구 사근동 9가길 6",
    "입주가능일": "즉시 입주 가능",
    "계약 형태": "반전세",
    "보증금": "8,900만원",
    "월세": "10만원",
    "관리비": "5만원",
    "해당층": "3층",
    "평 수": "6평",
    "방 수": "1개",
    "내부 구조": "베란다분리형"
}

export default class CompareChecklist extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };
      return (
        <Layout withToggle={true} active={"none"}>
            <div className={styles.headwrapper}>
                <span>보고싶은 정보들</span>
                <input type = "checkbox" id = {basics}></input>
                <label className={styles.basicsbox}>{basics}</label>
                <input type = "checkbox" id ={options}></input>
                <label className={styles.optionsbox}>{options}</label>
                <input type = "checkbox" id ={details}></input>
                <label className={styles.detailsbox}>{details}</label>
                <CreateListBtn type = "secondary-m"/>
            </div>
            <div className={styles.basicswrapper}>
                <div className={styles.basics}>
                    {Object.keys(checkbasics).map((key, index) => (
                        <div className={styles.basicsContent}>
                            {key}
                        </div>
                    ))}
                </div>
                <div className={styles.checklistwrapper}>
                    <Checklist></Checklist>
                    <Checklist></Checklist>
                    <Checklist></Checklist>
                </div>
            </div>

        </Layout>
      );
    }
  }
