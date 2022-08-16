import React from "react";
import styles from "../styles/components/checklist.module.scss";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { basicsBEtoFE, checkdetailsBEtoFE, optionsBEtoFE } from "../attributes/converter";
import { useSetRecoilState } from "recoil";
import { deleteIdState } from "../_recoil/state";
import NoImage from "../assets/noImage.png";

const Checklist = ({isChecked, whichChecked, value, checklist_id, toggle, setToggle, setIsDelete, img}) => {
    //console.log(checklist_id);
    const setDeleteId = useSetRecoilState(deleteIdState);

    const checkbasics = {
        "매물 위치": value.basicInfo_address,
        "입주가능일": value.basicInfo_move_in_date,
        "계약 형태": value.basicInfo_room_type,
        "보증금": value.basicInfo_deposit,
        "월세":  value.basicInfo_monthly_rent,
        "관리비": value.basicInfo_maintenance_fee,
        "해당층": value.basicInfo_floor,
        "평 수": value.basicInfo_area,
        "방 수": value.basicInfo_number_of_rooms,
        "내부 구조": value.basicInfo_interior_structure
    };

    const displayBasics = (key, value) =>{
        if (key === "매물 위치"){return value ? value : "-"}
        else if (key === "입주가능일"){return value ? (value === "바로입주가능"||value==="문의조정가능"? value :value.slice(0,10)) : "-";}
        else if (key === "계약 형태"){return value ? basicsBEtoFE[value] : "-";}
        else if (key === "보증금"){return value ? value/10000 + "만원" : "-";}
        else if (key === "월세"){return value ? value/10000+"만원" : "-";}
        else if (key === "관리비"){return value ? value/10000+ "만원" : "-";}
        else if (key === "해당층"){return value ? value + "층" : "-";}
        else if (key === "평 수"){return value ? value + "평" : "-";}
        else if (key === "방 수"){return value ? basicsBEtoFE[value] : "-";}
        else if (key === "내부 구조"){return value ? basicsBEtoFE[value] : "-";}
    };
    
    const checkoptions = {
        "가스레인지": value.option_gas_stove,"인덕션":value.option_induction,
        "전자레인지":value.option_microwave,"냉장고":value.option_refrigerator,
        "세탁기":value.option_washing_machine,"에어컨":value.option_air_conditioner,
        "인터넷":value.option_internet,"TV":value.option_tv,
        "와이파이":value.option_wifi,"옷장":value.option_closet,
        "수납장":value.option_cabinet,"신발장":value.option_shoe_rack,
        "침대":value.option_bed,"책상":value.option_desk,"의자":value.option_chair
    };

    const displayOptions = (key, value) =>{
        if (key === "가스레인지"){return optionsBEtoFE["option_gas_stove"][value];}
        else if (key === "인덕션"){return optionsBEtoFE["option_induction"][value];}
        else if (key === "전자레인지"){return optionsBEtoFE["option_microwave"][value];}
        else if (key === "냉장고"){return optionsBEtoFE["option_refrigerator"][value];}
        else if (key === "세탁기"){return optionsBEtoFE["option_washing_machine"][value];}
        else if (key === "에어컨"){return optionsBEtoFE["option_air_conditioner"][value];}
        else if (key === "인터넷"){return optionsBEtoFE["option_internet"][value];}
        else if (key === "TV"){return optionsBEtoFE["option_tv"][value];}
        else if (key === "와이파이"){return optionsBEtoFE["option_wifi"][value];}
        else if (key === "옷장"){return optionsBEtoFE["option_closet"][value];}
        else if (key === "수납장"){return optionsBEtoFE["option_cabinet"][value];}
        else if (key === "신발장"){return optionsBEtoFE["option_shoe_rack"][value];}
        else if (key === "침대"){return optionsBEtoFE["option_bed"][value];}
        else if (key === "책상"){return optionsBEtoFE["option_desk"][value];}
        else if (key === "의자"){return optionsBEtoFE["option_chair"][value];}
    };
    
    const checkdetails = {
        "곰팡이":value.detailInfo_is_moldy,"누수":value.detailInfo_is_leak,
        "벌레":value.detailInfo_is_bug,"균열":value.detailInfo_is_crack,
        "방음":value.detailInfo_soundproof,"창문 크기":value.detailInfo_window_size,
        "주실 방향":value.detailInfo_main_direction,"환풍기":value.detailInfo_ventilator,
        "통풍":value.detailInfo_ventilation,"외부 소음":value.detailInfo_external_noise,
        "수압":value.detailInfo_water_pressure,"배수":value.detailInfo_drainage,"온수":value.detailInfo_hot_water
    };

    const displayDetails = (key, value) =>{
        if (key === "곰팡이"){return value ? checkdetailsBEtoFE["detailInfo_is_moldy"][value] : "-";}
        else if (key === "누수"){return value ? checkdetailsBEtoFE["detailInfo_is_leak"][value] : "-";}
        else if (key === "벌레"){return value ? checkdetailsBEtoFE["detailInfo_is_bug"][value] : "-";}
        else if (key === "균열"){return value ? checkdetailsBEtoFE["detailInfo_is_crack"][value] : "-";}
        else if (key === "방음"){return value ? checkdetailsBEtoFE["detailInfo_soundproof"][value] : "-";}
        else if (key === "창문 크기"){return value ? checkdetailsBEtoFE["detailInfo_window_size"][value] : "-";}
        else if (key === "주실 방향"){return value ? checkdetailsBEtoFE["detailInfo_main_direction"][value] : "-";}
        else if (key === "환풍기"){return value ? checkdetailsBEtoFE["detailInfo_ventilator"][value] : "-";}
        else if (key === "통풍"){return value ? checkdetailsBEtoFE["detailInfo_ventilation"][value] : "-";}
        else if (key === "외부 소음"){return value ? checkdetailsBEtoFE["detailInfo_external_noise"][value] : "-";}
        else if (key === "수압"){return value ? checkdetailsBEtoFE["detailInfo_water_pressure"][value] : "-";}
        else if (key === "배수"){return value ? checkdetailsBEtoFE["detailInfo_drainage"][value] : "-";}
        else if (key === "온수"){return value ? checkdetailsBEtoFE["detailInfo_hot_water"][value] : "-";}
    };

    
    const handleDelete = (checklist_id) =>{
        // deleteChecklist(checklist_id);
        setDeleteId(checklist_id);
        setIsDelete(true);
        console.log("DELETE");
    };

    return(
        <div className={styles.checklistwrapper}>
            <div className = {styles.delete}>
                <button className = {styles.deleteButton} onClick ={()=>handleDelete(checklist_id)}>
                    <Delete/>
                </button>
            </div>

            <div className={styles.wangbasics}>
                <div className = {styles.basicswrap}>
                    <div className={styles.imagewrapper}>
                        <img className={styles.image} src = {img.length === 0 ? NoImage : `http://localhost:8000/media${img[0]}`} alt = 'listimg'/>
                    </div>
                    <div className={styles.basicsContentWrap}>
                        {Object.keys(checkbasics).map((key, index) => (
                            <div key={`basic - ${key}`} className={styles.basicsContent}>
                                {displayBasics(key, checkbasics[key])}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>

            <div className={isChecked[1] && whichChecked[1] ?styles.wangoptions :styles.none}>
                <div className = {styles.optionswrap}>
                    <div className={styles.optionsContentWrap}>
                        {Object.keys(checkoptions).map((key, index) => (
                            <div className={styles.optionsContent}>
                                {displayOptions(key, checkoptions[key])}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>
            
                
            <div className = {isChecked[2] && whichChecked[2] ?styles.wangdetails :styles.none}>
                <div className={styles.detailswrap}>
                    <div className={styles.detailsContentWrap}>
                        {Object.keys(checkdetails).map((key, index) => (
                            <div className={styles.detailsContent}>
                                {displayDetails(key, checkdetails[key])}
                            </div>
                        ))}
                    </div>
                    <div className={styles.emptylist}></div>
                </div>
            </div>
        
        </div>
    );
}
export default Checklist;