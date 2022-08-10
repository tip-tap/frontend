import { atom } from "recoil";

/* Map CenterPos */
export const centerPosState = atom({
    key: "centerPos",
    default: {
        centerLat: 33.450701,
        centerLng: 126.570667,
    }
});

/* SearchBox Input */
export const searchInputState = atom({
    key: "searchInput",
    default: ""
});

/* SearchBox Filter */
export const checksState = atom({
    key: "checks",
    default: Array(7).fill(0)
});

export const depositState = atom({
    key: "deposit",
    default: ""
});

export const monthlyState = atom({
    key: "monthly",
    default: []
});

export const extraOptionsState = atom({
    key: "extraOptions",
    default: {
        "가스레인지": 0, "인덕션": 0, "전자레인지": 0, "냉장고": 0,
        "세탁기": 0, "에어컨": 0, "인터넷": 0, "TV": 0,
        "와이파이": 0, "옷장": 0, "수납장": 0, "신발장": 0,
        "침대": 0, "책상": 0, "의자": 0, "건조대": 0
    }
});

/* CustomSlider value */
export const depositValueState = atom({
    key: "depositValue",
    default: [0, 0]
});

export const monthlyValueState = atom({
    key: "monthlyValue",
    default: [0, 0]
});