import { atom } from "recoil";

export const centerPosState = atom({
    key: "centerPos",
    default: {
        centerLat: 33.450701,
        centerLng: 126.570667,
    }
});

export const searchInputState = atom({
    key: "searchInput",
    default: ""
});