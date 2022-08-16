import maja from "../assets/maja.svg";
import anya from "../assets/anya.svg"

/*
export const converter = {
    "전세": "J",
    "반전세": "BJ",
    "월세": "M",
    "원룸": "1",
    "1.5룸": "1.5",
    "투룸": "2",
    "쓰리룸": "3",
    "오픈형": "O",
    "주방분리형": "K",
    "베란다분리형": "V",
    "주방베란다분리형": "KV",
    "복층형": "L",
    "상": "A",
    "중": "B",
    "하": "C",
    "크다": "L",
    "보통": "M",
    "작다": "S",
    "동향": "E",
    "서향": "W",
    "남향": "S",
    "북향": "N",
    "빠르다": "F",
    "보통이다": "N",
    "느리다": "S",
    "세다": "S", 
    "약하다": "W",
};
*/

export const basicsFEtoBE = {
    "전세": "J",
    "반전세": "BJ",
    "월세": "M",
    "원룸": "1",
    "1.5룸": "1.5",
    "투룸": "2",
    "쓰리룸": "3",
    "오픈형": "O",
    "주방분리형": "K",
    "베란다분리형": "V",
    "주방베란다분리형": "KV",
    "복층형": "L",
};

export const basicsBEtoFE = {
    "J": "전세",
    "BJ": "반전세",
    "M": "월세",
    "1": "원룸",
    "1.5": "1.5룸",
    "2": "투룸",
    "3": "쓰리룸",
    "O": "오픈형",
    "K": "주방분리형",
    "V": "베란다분리형",
    "KV": "주방베란다분리형",
    "L": "복층형"
};

export const detailsFEtoBE = {
    "detailInfo_soundproof": {
        "상": "A", "중": "B", "하": "C"
    },
    "detailInfo_window_size": {
        "크다": "L", "보통이다": "M", "작다": "S"
    },
    "detailInfo_main_direction": {
        "동향": "E", "서향": "W", "남향": "S", "북향": "N"
    },
    "detailInfo_ventilator": {
        "빠르다": "F", "보통이다": "N", "느리다": "S"
    },
    "detailInfo_ventilation": {
        "상": "A", "중": "B", "하": "C"
    },
    "detailInfo_external_noise": {
        "크다": "L", "보통이다": "M", "작다": "S"
    },
    "detailInfo_water_pressure": {
        "세다": "S", "보통이다": "N", "약하다": "W"
    },
    "detailInfo_drainage": {
        "세다": "S", "보통이다": "N", "약하다": "W"
    },
    "detailInfo_hot_water": {
        "세다": "S", "보통이다": "N", "약하다": "W"
    }  
};

export const detailsBEtoFE = {
    "detailInfo_is_moldy":{
        "true": "있다", "false": "없다"
    },
    "detailInfo_is_leak":{
        "true": "있다", "false": "없다"
    },
    "detailInfo_is_bug":{
        "true": "있다", "false": "없다"
    },
    "detailInfo_is_crack":{
        "true": "있다", "false": "없다"
    },
    "detailInfo_soundproof": {
        "A": "상", "B": "중", "C": "하"
    },
    "detailInfo_window_size": {
        "L": "크다", "M": "보통이다", "S": "작다"
    },
    "detailInfo_main_direction": {
        "E": "동향", "W": "서향", "S": "남향", "N": "북향"
    },
    "detailInfo_ventilator": {
        "F": "빠르다", "N": "보통이다", "S": "느리다"
    },
    "detailInfo_ventilation": {
        "A": "상", "B": "중", "C": "하"
    },
    "detailInfo_external_noise": {
        "L":"크다", "M":" 보통이다", "S": "작다"
    },
    "detailInfo_water_pressure": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    },
    "detailInfo_drainage": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    },
    "detailInfo_hot_water": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    }
};

export const checkdetailsBEtoFE = {
    "detailInfo_is_moldy":{
        "true": "있음", "false": "없음"
    },
    "detailInfo_is_leak":{
        "true": "있음", "false": "없음"
    },
    "detailInfo_is_bug":{
        "true": "있음", "false": "없음"
    },
    "detailInfo_is_crack":{
        "true": "있음", "false": "없음"
    },
    "detailInfo_soundproof": {
        "A": "상", "B": "중", "C": "하"
    },
    "detailInfo_window_size": {
        "L": "크다", "M": "보통이다", "S": "작다"
    },
    "detailInfo_main_direction": {
        "E": "동향", "W": "서향", "S": "남향", "N": "북향"
    },
    "detailInfo_ventilator": {
        "F": "빠르다", "N": "보통이다", "S": "느리다"
    },
    "detailInfo_ventilation": {
        "A": "상", "B": "중", "C": "하"
    },
    "detailInfo_external_noise": {
        "L":"크다", "M":" 보통이다", "S": "작다"
    },
    "detailInfo_water_pressure": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    },
    "detailInfo_drainage": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    },
    "detailInfo_hot_water": {
        "S": "세다", "N": "보통이다", "W": "약하다"
    }
};

export const optionsBEtoFE = {
    "option_gas_stove": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_induction": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_microwave": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_refrigerator": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_washing_machine": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_air_conditioner": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_internet": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_tv": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_wifi": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_closet": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_cabinet": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_shoe_rack": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_bed": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_desk": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
    "option_chair": {
        "true": <img src = {maja}/>, "false": <img src = {anya}/>
    },
}