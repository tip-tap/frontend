import React from "react";
import Header from "./Header";

const Layout = ({ withToggle = true, active = "none", children }) => {
    return (
        <>
            <Header withToggle={withToggle} active={active}/>
            { children }
        </>
    )
}

export default Layout;