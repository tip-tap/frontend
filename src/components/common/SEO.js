import React from "react";
import { Helmet } from "react-helmet";
import { config } from "../../config";

const SEO = ({ pageTitle, pageSEO }) => {
    let desc = pageSEO ? pageSEO.desc : config.desc;
    let url = pageSEO ? config.url + pageSEO.url : config.url;
    let img = config.img;

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <link rel="icon" type="image/svg" href="tiptap-favicon.svg" sizes="16x16" />

            <meta name="description" content={desc} />
            <meta name="url" content={url} />
            <meta name="img" content={img} />
            
            <meta property="og:title" content={pageTitle} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={img} />
        </Helmet>
    );
}

export default SEO;