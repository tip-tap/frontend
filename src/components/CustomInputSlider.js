import React, { useState } from "react";
import { InputNumber, Slider } from "antd";
import { ReactComponent as Suffix } from "../assets/suffix.svg";
import styles from "../styles/components/customInputSlider.module.scss";

const CustomInputSlider = ({ min, max, text, onChange }) => {
    const [inputValue, setInputValue] = useState(null);
    const [showSlider, setShowSlider] = useState(false);

    const handleSuffix = () => {
        setShowSlider(!showSlider);
    }

    const handleChange = (newValue) => {
        setInputValue(newValue);
        onChange(newValue);
    }

    return (
        <>
            <InputNumber
                placeholder="0"
                value={inputValue}
                onChange={handleChange}
                style={{width: 100, paddingRight: 20}}
                bordered={false}
            />
            <label className={styles.unit}>{text}</label>
            <Suffix className={styles.suffix} onClick={handleSuffix} />

            {showSlider &&
            <div className={styles.slider}>
                <Slider
                    min={min}
                    max={max}
                    tipFormatter={null}
                    style={{width: "10rem", margin: "auto"}}
                    onChange={handleChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    trackStyle={{backgroundColor: "#0040BD"}}
                    handleStyle={{borderColor: "#0040BD"}}
                />
                <div className={styles.units}>
                    <span>{min}</span>
                    <span>{max/2 + text}</span>
                    <span>{max + text + "이상"}</span>
                </div>
            </div>
            }
        </>
    );
}

export default CustomInputSlider;