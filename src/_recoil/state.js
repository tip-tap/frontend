import { atom } from "recoil";

/* Map Pos */
export const centerPosState = atom({
    key: "centerPos",
    default: {
        centerLat: 37.566783658885626,
        centerLng: 126.97865792991867,
    }
});

export const lowerLeftPosState = atom({
    key: "lowerLeftPos",
    default: {
        lowerLeftLat: 37.5665,
        lowerLeftLng: 126.97423268424383,
    }
});

export const upperRightPosState = atom({
    key: "upperRightPos",
    default: {
        upperRightLat: 37.56820802746253,
        upperRightLng: 126.98363800062684
    }
});

/* Map Level */
export const mapLevelState = atom({
    key: "mapLevel",
    default: 3,
});

/* SearchBox Input */
export const searchInputState = atom({
    key: "searchInput",
    default: ""
});

/* SearchBox Filter */
export const checksState = atom({
    key: "checks",
    default: Array(7).fill(1)
});

export const depositStrState = atom({
    key: "depositStr",
    default: "0원 ~ 무제한"
});

export const monthlyStrState = atom({
    key: "monthlyStr",
    default: "0원 ~ 무제한",
});

export const depositNumState = atom({
    key: "depositNum",
    default: {
        min: 0,
        max: 1000000000,
    }
});

export const monthlyNumState = atom({
    key: "monthlyNum",
    default: {
        min: 0,
        max: 10000000,
    }
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
    default: [0, 48]
});

export const monthlyValueState = atom({
    key: "monthlyValue",
    default: [0, 20]
});

/* Delete Handler */
export const deleteIdState = atom({
    key: "deleteId",
    default: -1,
});

/* Rooms Getter */
export const defaultRoomsState = atom({
    key: "defaultRooms",
    default: [],
});

export const filteredRoomsState = atom({
    key: "filteredRooms",
    default: [],
});