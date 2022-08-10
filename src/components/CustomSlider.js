import React from "react";
import { Slider } from "antd";
import { useRecoilValue } from "recoil";
import { depositValueState, monthlyValueState } from "../_recoil/state";

const CustomSlider = ({ min, max, handleValue }) => {
    const depositValue = useRecoilValue(depositValueState);
    const monthlyValue = useRecoilValue(monthlyValueState);

    return (
        <Slider
            defaultValue={max === 48 ? depositValue : monthlyValue}
            range
            min={min}
            max={max}
            tipFormatter={null}
            style={{width: "12rem", margin: "0.25rem 0.325rem 0.25rem 0.325rem"}}
            onChange={handleValue}
            trackStyle={{backgroundColor: "#0040BD"}}
            handleStyle={{borderColor: "#0040BD"}}
        />
    );
}

export default CustomSlider;