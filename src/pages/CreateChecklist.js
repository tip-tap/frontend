import React, { useState, useRef } from 'react';
import styles from "../styles/pages/createcl.module.scss";
import Layout from "../components/common/Layout";
import ImgUpload from '../components/ImgUpload';

const CreateChecklist = () => {

    return(
        <Layout withToggle={true} active={"none"}>
            <div className = {styles.wrapper}>
                <form>
                    <section className = {styles.imgwrapper}>
                        <ImgUpload></ImgUpload>
                    </section>
                </form>
            </div>
        </Layout>
    );
}

export default CreateChecklist;