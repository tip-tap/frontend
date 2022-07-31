import React from "react";
import { Slider } from "antd";

const CustomSlider = ({ min, max, handleValue }) => {
    return (
        <Slider
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