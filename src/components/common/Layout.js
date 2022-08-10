import React from "react";
import Header from "./Header";

const Layout = ({ active, children }) => {
    return (
        <>
            <Header active={active} />
            { children }
        </>
    )
}

export default Layout;